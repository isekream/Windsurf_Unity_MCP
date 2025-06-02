# Security and Privacy Guidelines

## 🔒 Security Best Practices

When setting up and using the Windsurf Unity MCP, follow these security guidelines:

### 🏠 Local Development Only

- **Unity HTTP Server**: Runs on `localhost:8090` only
- **No External Access**: The server is not accessible from outside your machine
- **Local Network Only**: Unity MCP only accepts connections from your local machine

### 🚫 What NOT to Share Publicly

If you fork or modify this repository, **DO NOT** include:

- ❌ Personal usernames or home directories
- ❌ Absolute paths containing your username
- ❌ Computer names or personal identifiers
- ❌ Custom API keys or secrets (if you add them)
- ❌ Project-specific paths in documentation

### ✅ Safe Configuration Patterns

Use these patterns in your configurations:

```json
// ✅ Good - Relative paths
{
  "command": "node",
  "args": ["./Server/build/index.js"],
  "cwd": "."
}

// ✅ Good - Environment variables
{
  "command": "windsurf-unity-mcp",
  "env": {
    "UNITY_PORT": "8090"
  }
}

// ❌ Bad - Absolute paths with usernames
{
  "args": ["/Users/yourname/Documents/project/Server/build/index.js"]
}
```

### 🔧 Configuration Files

Before sharing any configuration:

1. **Replace absolute paths** with relative paths or placeholders
2. **Use environment variables** for any sensitive settings
3. **Review all JSON/config files** for personal information
4. **Test with fresh user account** if possible

### 📁 Safe Folder Structure

```
your-project/
├── Server/
│   └── build/index.js          # ✅ Relative path
├── mcp.json                    # ✅ Uses relative paths
└── .windsurf/mcp.json         # ✅ Uses relative paths
```

### 🌍 Environment Variables

For any sensitive configuration, use environment variables:

```bash
# ✅ Good
export UNITY_PORT=8090
export NODE_ENV=production

# ❌ Avoid hardcoding in shared files
UNITY_PORT=8090 in config files shared publicly
```

### 🔍 Pre-Commit Checklist

Before committing or sharing:

- [ ] No usernames in file paths
- [ ] No computer names in configurations
- [ ] All paths are relative or use placeholders
- [ ] No personal directories exposed
- [ ] Environment variables used for sensitive data
- [ ] Documentation uses generic examples

### 🛡️ Network Security

- **Firewall**: The Unity server only binds to localhost
- **No Remote Access**: Cannot be accessed from other machines
- **Port Usage**: Only uses local port 8090 by default
- **No Authentication Required**: Since it's localhost-only

### 📝 Contributing Guidelines

If contributing to this project:

1. **Test configurations** on a clean machine
2. **Use placeholder paths** in all documentation
3. **Remove personal information** before submitting PRs
4. **Follow the patterns** established in existing files

### 🚨 If You Accidentally Exposed Information

If you've already committed personal information:

1. **Don't panic** - it happens
2. **Remove the information** in a new commit
3. **Consider rebasing** your git history if recent
4. **Review other files** for similar issues
5. **Update your security practices** going forward

## 📧 Questions?

If you're unsure about what's safe to share, err on the side of caution and ask the community or maintainers for guidance. 