#!/bin/bash

# Windsurf Unity MCP Installation Script
# Safe for public sharing - contains no personal information

echo "🚀 Installing Windsurf Unity MCP..."
echo ""

# Check requirements
echo "📋 Checking requirements..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "18" ]; then
    echo "❌ Node.js version 18+ required. Current: $(node -v)"
    echo "   Please update Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) found"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm."
    exit 1
fi

echo "✅ npm $(npm -v) found"

# Build and install the MCP server
echo ""
echo "📦 Building MCP server..."
cd Server
npm install
npm run build

echo ""
echo "🌍 Installing globally..."
npm link

cd ..

# Verify installation
echo ""
echo "🔍 Verifying installation..."
if command -v windsurf-unity-mcp &> /dev/null; then
    echo "✅ windsurf-unity-mcp command available at: $(which windsurf-unity-mcp)"
else
    echo "⚠️  Global command not found in PATH"
    echo "   You may need to add npm global bin to your PATH:"
    echo "   export PATH=\"$(npm config get prefix)/bin:\$PATH\""
fi

# Create global Windsurf configuration
echo ""
echo "📝 Setting up global Windsurf configuration..."

GLOBAL_CONFIG_DIR="$HOME/.config/windsurf"
GLOBAL_MCP_CONFIG="$GLOBAL_CONFIG_DIR/mcp.json"

mkdir -p "$GLOBAL_CONFIG_DIR"

if [ -f "$GLOBAL_MCP_CONFIG" ]; then
    echo "⚠️  Existing Windsurf MCP config found at: $GLOBAL_MCP_CONFIG"
    echo "   Please manually add the Unity MCP configuration:"
    echo ""
    echo "   {"
    echo "     \"mcpServers\": {"
    echo "       \"unity-mcp\": {"
    echo "         \"command\": \"windsurf-unity-mcp\","
    echo "         \"env\": {"
    echo "           \"NODE_ENV\": \"production\","
    echo "           \"UNITY_PORT\": \"8090\""
    echo "         },"
    echo "         \"description\": \"Unity Editor integration for Windsurf IDE\","
    echo "         \"enabled\": true"
    echo "       }"
    echo "     }"
    echo "   }"
else
    cat > "$GLOBAL_MCP_CONFIG" << 'EOF'
{
  "mcpServers": {
    "unity-mcp": {
      "command": "windsurf-unity-mcp",
      "env": {
        "NODE_ENV": "production",
        "UNITY_PORT": "8090"
      },
      "description": "Unity Editor integration for Windsurf IDE",
      "enabled": true
    }
  }
}
EOF
    echo "✅ Global configuration created at: $GLOBAL_MCP_CONFIG"
fi

echo ""
echo "🎉 Installation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Open Unity Editor with any project"
echo "2. Install Unity package via Package Manager:"
echo "   Window > Package Manager > + > Add package from git URL"
echo "   https://github.com/isekream/Windsurf_Unity_MCP.git?path=/Unity"
echo "3. Start Unity MCP server: Tools > Windsurf MCP > Server Window"
echo "4. Restart Windsurf IDE"
echo "5. Start using Unity commands in Windsurf!"
echo ""
echo "📖 For detailed instructions, see:"
echo "   - README.md for complete setup guide"
echo "   - QUICK_UNITY_SETUP.md for per-project setup"
echo "   - SECURITY_AND_PRIVACY.md for security guidelines"
echo ""
echo "🌍 The MCP will now work with ALL your Unity projects!" 