# 🚀 Quick Unity MCP Setup Guide

Get Unity MCP running with all 40 tools in 5 minutes!

## ✅ Prerequisites Check

- [ ] Unity 2022.3+ installed
- [ ] Node.js 18+ installed  
- [ ] Windsurf IDE with MCP support

## 🎯 Step-by-Step Setup

### 1. Configure Windsurf MCP (2 minutes)

Copy this configuration to `~/.config/windsurf/mcp.json`, **replacing `<PATH_TO_WINDSURF_UNITY_MCP>` with your actual project path**:

```json
{
  "mcpServers": {
    "unity-mcp": {
      "command": "node",
      "args": ["./Server/build/index.js"],
      "cwd": "<PATH_TO_WINDSURF_UNITY_MCP>",
      "env": {
        "NODE_ENV": "production",
        "UNITY_PORT": "8090"
      },
      "description": "Unity Editor integration for Windsurf IDE - 40 tools for project, scene, asset, code, and build management",
      "enabled": true
    }
  }
}
```

**Example paths:**
- macOS: `/Users/yourname/Documents/Windsurf_Unity_MCP`
- Windows: `C:\Users\yourname\Documents\Windsurf_Unity_MCP`
- Linux: `/home/yourname/Documents/Windsurf_Unity_MCP`

### 2. Install Unity Plugin (1 minute)

1. Open Unity Editor with any project
2. Go to `Window > Package Manager`
3. Click `+` → `Add package from git URL...`
4. Enter: `https://github.com/isekream/Windsurf_Unity_MCP.git?path=/Unity`
5. Click `Add`

### 3. Start Unity MCP Server (30 seconds)

1. In Unity: `Tools > Windsurf MCP > Server Window`
2. Click **`Start Server`**
3. Verify status shows **"Running"** (green) at `http://localhost:8090`
4. Check that **40 tools** are registered

### 4. Test Connection (1 minute)

Run this test command in terminal (replace path with your actual project location):
```bash
cd <PATH_TO_WINDSURF_UNITY_MCP>
python3 unity_mcp_client.py project.getInfo
```

Expected output: Project information JSON (not timeout/connection errors)

### 5. Restart Windsurf (30 seconds)

1. Close Windsurf IDE completely
2. Reopen Windsurf
3. Unity MCP should appear in Tools menu

## 🎉 You're Ready!

### Test These Commands in Windsurf:

- "Analyze my Unity project structure"
- "Create a cube in the scene"  
- "List all scenes in the project"
- "Show me the project build settings"

### All 40 Available Tools:

#### Project (7 tools)
- `project.analyze` - Full project analysis
- `project.getInfo` - Basic project info
- `project.setSettings` - Change project settings
- `project.listScenes` - List all scenes
- `project.getBuildSettings` - Get build config
- `project.setBuildTarget` - Change build platform
- `project.refreshAssets` - Refresh asset database

#### Scene (8 tools)  
- `scene.createGameObject` - Create objects
- `scene.modifyComponent` - Edit components
- `scene.query` - Find objects
- `scene.selectObjects` - Select objects
- `scene.deleteGameObject` - Delete objects
- `scene.moveGameObject` - Move/transform
- `scene.save` - Save scenes
- `scene.load` - Load scenes

#### Assets (8 tools)
- `assets.import` - Import files
- `assets.createMaterial` - Make materials
- `assets.managePrefabs` - Handle prefabs
- `assets.organize` - Organize folders
- `assets.search` - Find assets
- `assets.createTexture` - Make textures
- `packages.manage` - Handle packages
- `assets.getInfo` - Asset details

#### Code (8 tools)
- `code.createScript` - Generate scripts
- `code.analyzeScripts` - Analyze code
- `code.attachScripts` - Attach to objects
- `code.findReferences` - Find usage
- `code.refactor` - Refactor code
- `code.generateDocumentation` - Make docs
- `code.validate` - Check code quality
- `code.format` - Format code

#### Build (9 tools)
- `build.configure` - Setup builds
- `build.execute` - Run builds
- `build.runTests` - Run tests
- `build.getReport` - Build reports
- `build.clean` - Clean cache
- `build.addressables` - Addressables
- `build.optimize` - Optimize
- `build.getConsoleLogs` - Console logs
- `build.profile` - Performance

## 🐛 Troubleshooting

### "Connection refused"
- ✅ Unity Editor is running
- ✅ Unity MCP Server shows "Running" 
- ✅ Port 8090 is available

### "Tool execution timed out"
- ✅ Unity Editor is responsive (not frozen)
- ✅ Check Unity Console for errors
- ✅ Increase timeout in Unity MCP settings

### "MCP not in Windsurf Tools"
- ✅ Restart Windsurf completely
- ✅ Check `~/.config/windsurf/mcp.json` syntax
- ✅ Verify path in `cwd` field is correct

### "Tool not found"
- ✅ Unity MCP Server window shows all tools registered
- ✅ Use correct tool format: `category.action`
- ✅ Check Node.js server logs

## 📞 Quick Support

**Test Connection**: `curl -X POST http://localhost:8090 -H "Content-Type: application/json" -d '{"id":"test","type":"request","method":"project.getInfo","params":{}}'`

**View All Tools**: Open Unity MCP Server Window in Unity Editor

**Debug Mode**: Enable detailed logging in Unity MCP Server settings

---

**🎯 Success Criteria**: You can run `python3 unity_mcp_client.py project.analyze` from your project directory and get project details (not errors). 