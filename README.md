# What's this?
ConnnectCarolina spider.

# Getting started

1. Create a file named `config.json`.
2. Open ConnectCarolina and log in.
3. In Chrome console, pick one request to cs.cc.unc.edu and copy your cookie.
4. Paste cookie in `config.json` and format it like this:

```
{
  "cookie": "paste-your-cookie-here"
}
```

Then, run `node grade` to get your grade or `node availability` to check which courses in your shopping cart are available.
