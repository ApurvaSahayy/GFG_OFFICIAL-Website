# Timeline Media Directory Structure

This directory contains all media files (photos and videos) for the Evolution Timeline section.

## Directory Organization

```
timeline/
├── orientation/          # Chapter Foundation media
│   ├── meeting-1.jpg
│   ├── team-building.jpg
│   └── highlights.mp4
│
├── chai/                 # Chai Links sessions
│   ├── ch0/
│   │   ├── gathering.jpg
│   │   ├── discussions.jpg
│   │   ├── video.mp4
│   │   └── video-thumb.jpg
│   ├── ch1/
│   │   ├── session.jpg
│   │   └── knowledge-sharing.jpg
│   └── ch2/              # Add future sessions here
│
└── founders/             # Founder profiles
    ├── zahid/
    │   ├── launch.jpg
    │   ├── interview.mp4
    │   └── interview-thumb.jpg
    └── [other-founders]/  # Add more founders here
```

## File Naming Convention

- Use lowercase with hyphens: `team-building.jpg`
- For thumbnails: `[video-name]-thumb.jpg`
- Keep names descriptive but concise

## Media Guidelines

### Images
- **Format**: JPG or PNG
- **Aspect Ratio**: 16:9 (1920x1080px recommended)
- **File Size**: Under 500KB (optimize before upload)
- **Quality**: High resolution, well-lit

### Videos
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1080p or 720p
- **Duration**: Ideally under 2 minutes
- **File Size**: Under 50MB
- **Thumbnail**: Always include a thumbnail image

## How to Add Media

1. **Take/collect photos and videos** from events
2. **Optimize files** using tools like:
   - Images: TinyPNG, ImageOptim
   - Videos: HandBrake, FFmpeg
3. **Place files** in the appropriate directory
4. **Update** `data/timeline-content.ts` with the file paths
5. **Test** the timeline section to ensure media loads correctly

## Currently Needed Media

### High Priority
- Chapter Foundation orientation photos (3-5 images)
- Chai Links Ch 0 photos and video
- Zahid Akhtar profile photo and interview video

### Future Additions
- Additional Chai Links sessions (Ch 2, Ch 3, etc.)
- More founder profiles
- Event highlights and milestones

## Tools for Media Optimization

### Online
- [TinyPNG](https://tinypng.com/) - Image compression
- [Squoosh](https://squoosh.app/) - Image optimization
- [CloudConvert](https://cloudconvert.com/) - Video conversion

### Desktop
- HandBrake - Video compression
- FFmpeg - Video/audio processing
- ImageMagick - Batch image processing

## Troubleshooting

**Media not displaying?**
- Check file path in `data/timeline-content.ts`
- Ensure file exists in `/public/timeline/`
- Verify file extension matches (case-sensitive)
- Clear browser cache and refresh

**Large file sizes?**
- Compress images to under 500KB
- Use online tools or desktop apps
- Consider reducing resolution if needed

**Video won't play?**
- Convert to MP4 with H.264 codec
- Check browser compatibility
- Ensure file isn't corrupted

---

**Last Updated**: February 2026  
**Contact**: Development Team for assistance
