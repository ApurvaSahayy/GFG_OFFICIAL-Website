# Evolution Timeline - Content Management Guide

## Overview
The Evolution Timeline section displays the chapter's journey through three main categories:
1. **Chapter Foundation** - Orientation events
2. **Chai Links** - Community chai sessions (Ch 0, Ch 1, etc.)
3. **Founders Unplugged** - Founder stories (Zahid Akhtar, etc.)

## For Admins & Leads: How to Update Content

### 📁 File Locations
- **Content Data**: `d:\GFG\frontend\data\timeline-content.ts`
- **Component**: `d:\GFG\frontend\components\features\EvolutionTimeline.tsx`

### 📸 Media Upload Instructions

#### Step 1: Organize Your Media Files
1. Create folders in `/public/timeline/` following this structure:
```
/public/timeline/
  ├── orientation/
  │   ├── meeting-1.jpg
  │   ├── team-building.jpg
  │   └── highlights.mp4
  ├── chai/
  │   ├── ch0/
  │   │   ├── gathering.jpg
  │   │   └── video.mp4
  │   └── ch1/
  │       └── session.jpg
  └── founders/
      └── zahid/
          ├── launch.jpg
          └── interview.mp4
```

#### Step 2: Update the Data File
Open `data/timeline-content.ts` and modify the `timelineData` array:

**To add a new Chai Links session:**
```typescript
{
    id: "ch-2",
    title: "Ch 2",
    description: "Description of this chai session",
    media: [
        {
            type: "image",
            url: "/timeline/chai/ch2/photo1.jpg",
            caption: "Photo caption"
        },
        {
            type: "video",
            url: "/timeline/chai/ch2/video.mp4",
            thumbnail: "/timeline/chai/ch2/video-thumb.jpg",
            caption: "Video caption"
        }
    ]
}
```

**To add a new Founder:**
```typescript
{
    id: "founder-name",
    title: "Full Name",
    description: "Their story and contribution to the chapter",
    media: [
        {
            type: "image",
            url: "/timeline/founders/name/photo.jpg",
            caption: "Caption for the photo"
        }
    ]
}
```

#### Step 3: Save and Refresh
- Save the `timeline-content.ts` file
- The website will automatically update (hot reload in development)
- For production, rebuild the site: `npm run build`

### 🎥 Media Best Practices

**Images:**
- Format: JPG or PNG
- Recommended size: 1920x1080px or 16:9 aspect ratio
- Optimize images before upload (use tools like TinyPNG)
- Keep file size under 500KB for faster loading

**Videos:**
- Format: MP4 (H.264 codec)
- Recommended resolution: 1080p
- Keep videos under 2 minutes for better UX
- Always provide a thumbnail image
- Keep file size reasonable (under 50MB)

### 🔄 Content Update Workflow

1. **Gather Media**: Collect photos and videos from events
2. **Organize Files**: Place them in appropriate folders under `/public/timeline/`
3. **Edit Data File**: Update `data/timeline-content.ts` with file paths and captions
4. **Test**: Check the timeline section on the website
5. **Deploy**: Push changes to production

### 📝 Field Explanations

- **id**: Unique identifier (lowercase, no spaces, use hyphens)
- **title**: Display name shown to users
- **description**: Brief explanation of the section/subsection
- **type**: Either "image" or "video"
- **url**: Path to the media file (starts with /timeline/)
- **thumbnail**: (Optional) For videos, path to preview image
- **caption**: Short description shown below the media

### 🎨 Customization Options

**To change section colors**, modify the `color` field:
- `"primary"` - Green (#00FF80)
- `"secondary"` - Cyan (#00F0FF)
- `"accent"` - Pink (#FF00FF)

### ⚙️ Future: Admin Panel Integration

Currently, content is managed by editing files directly. In the future, we can add:
- Web-based CMS dashboard
- Drag-and-drop media upload
- WYSIWYG content editor
- User role permissions
- Version history

### 📞 Need Help?

Contact the development team if you encounter issues:
- TypeScript errors when editing the data file
- Media files not displaying
- Permission errors when uploading files

---

**Last Updated**: February 2026
**Maintained by**: GFG Development Team
