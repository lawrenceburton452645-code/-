#!/usr/bin/env python3
"""TikTok 违规视频申诉材料生成器
用法:
  python appeal_kit.py --video <TikTok视频链接或本地mp4> --product <商品主图路径或URL> \
      --item "pink ruffle babydoll set with stockings" --action "stands and moves naturally while holding her phone" \
      --points 10 [--out appeal_out]
依赖: pip install yt-dlp pillow requests ; 系统需安装 ffmpeg
输出: evidence_1_product.jpg, evidence_2_frames.jpg, appeal.txt
"""
import argparse, json, os, subprocess, sys, io
from PIL import Image, ImageDraw, ImageFont

def font(size, bold=False):
    for p in (["C:/Windows/Fonts/arialbd.ttf","/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf","/System/Library/Fonts/Supplemental/Arial Bold.ttf"] if bold else
              ["C:/Windows/Fonts/arial.ttf","/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf","/System/Library/Fonts/Supplemental/Arial.ttf"]):
        if os.path.exists(p): return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def run(cmd): subprocess.run(cmd, check=True)

def get_video(src, out):
    if os.path.exists(src): return src
    p = os.path.join(out, "v.mp4")
    run([sys.executable, "-m", "yt_dlp", "-o", p, "-f", "mp4/best", src])
    return p

def duration(v):
    r = subprocess.run(["ffprobe","-v","error","-show_entries","format=duration","-of","json",v],capture_output=True,text=True)
    return float(json.loads(r.stdout)["format"]["duration"])

def frame(v, t, path, w=480):
    run(["ffmpeg","-loglevel","error","-y","-ss",f"{t:.2f}","-i",v,"-frames:v","1","-vf",f"scale={w}:-2","-q:v","2",path])
    return Image.open(path).convert("RGB")

def load_img(src):
    if src.startswith("http"):
        import requests; return Image.open(io.BytesIO(requests.get(src,timeout=30).content)).convert("RGB")
    return Image.open(src).convert("RGB")

def main():
    a = argparse.ArgumentParser()
    a.add_argument("--video", required=True); a.add_argument("--product", required=True)
    a.add_argument("--item", required=True); a.add_argument("--action", default="stands and moves naturally")
    a.add_argument("--points", default="10"); a.add_argument("--out", default="appeal_out")
    a.add_argument("--times", help="自定义截帧秒数, 逗号分隔, 例如 0.5,3,5,7,11,12.8 (避开带箭头/标注的帧)")
    g = a.parse_args(); os.makedirs(g.out, exist_ok=True)
    v = get_video(g.video, g.out); D = duration(v)
    ts = [float(x) for x in g.times.split(",")] if g.times else [D*k for k in (0.04,0.22,0.4,0.58,0.8,0.97)]
    frames = [frame(v,t,os.path.join(g.out,f"f{i}.jpg")) for i,t in enumerate(ts)]
    # 图1 商品对比
    W=1000; c=Image.new("RGB",(W,820),"white"); d=ImageDraw.Draw(c)
    d.text((30,25),"The product and the video",font=font(36,1),fill="black")
    d.text((30,75),g.item,font=font(22),fill="#444")
    p=load_img(g.product); p=p.resize((450,int(p.height*450/p.width))).crop((0,0,450,600))
    mid=frames[2]; mid=mid.resize((int(mid.width*600/mid.height),600))
    d.text((30,120),"Product page image",font=font(24,1),fill="black")
    d.text((500,120),f"Video at 0:{int(ts[2]):02d}",font=font(24,1),fill="black")
    c.paste(p,(30,160)); c.paste(mid,(500,160))
    d.text((30,775),"Both images show the same product worn as sold.",font=font(20),fill="black")
    c.save(os.path.join(g.out,"evidence_1_product.jpg"),quality=92)
    # 图2 六帧
    fw=300; fr=[x.resize((fw,int(x.height*fw/x.width))) for x in frames]; fh=fr[0].height
    c=Image.new("RGB",(3*fw+80,2*(fh+50)+190),"white"); d=ImageDraw.Draw(c)
    d.text((20,20),"Screenshots from the flagged video",font=font(34,1),fill="black")
    d.text((20,68),f"{round(D)}-second video | Frames from the start, middle and end",font=font(20),fill="#444")
    for i,x in enumerate(fr):
        X=20+(i%3)*(fw+20); Y=110+(i//3)*(fh+50)
        d.text((X,Y),f"{int(ts[i]//60):02d}:{ts[i]%60:04.1f}",font=font(20,1),fill="black"); c.paste(x,(X,Y+30))
    d.text((20,c.height-60),"Face and full outfit stay in view. No close-ups of private areas.",font=font(19),fill="black")
    c.save(os.path.join(g.out,"evidence_2_frames.jpg"),quality=92)
    # 申诉理由
    t=(f"Hi team, I believe this video was flagged by mistake. It's a short showcase of the {g.item} sold in my shop. "
       f"The model {g.action}, and her face and the full outfit stay in view the whole time, with no close-ups of private areas. "
       f"I've attached video screenshots and the product image for reference. Please review the full video and remove the "
       f"{g.points}-point deduction and related restrictions. Thank you.")
    open(os.path.join(g.out,"appeal.txt"),"w",encoding="utf-8").write(t)
    print(t); print(f"\n[{len(t)} characters, limit 500]  Output: {os.path.abspath(g.out)}")
    if len(t)>500: print("WARNING: over 500 characters, shorten --item/--action")

if __name__=="__main__": main()
