---
title: First Blog
date: 2023-05-18 00:00:00 +0800
categories:
  - Life
  - Blogging
tags:
  - misc
---

This is my first blog, build by Jekyll and github Pages. Theme is `Chirpy Jekyll Theme`. I will restart blogging life.

## Install Steps

1. Install refer to:  https://chirpy.cotes.page/posts/getting-started/ 

2. Writing a blog refer to:  https://chirpy.cotes.page/posts/write-a-new-post/

3. Want to know more about Jekyll can refer to: https://jekyllrb.com/docs/posts/

   

># Trouble shooting
>

★★★1.  You will get following errors when execute `bash tools/init` in  windows. 

  ```
'NODE_ENV' is not recognized as an internal or external command,
  ```

  The Way to fix it is change build command in package.json

  ```
"build": "set NODE_ENV=production & npx rollup -c --bundleConfigAsCjs",
  ```
  {: file="package.json" }

  Then run `npm i && npm run build` to generate contents in the dir `assets/js/dist`



★★★ 2. If you get following content when access index page after push: 

  ```
--- layout: home # Index page ---

  ```

  It may be performing github actions, you should wait a minute. And service worker still can cache data, you can get latest page by using **Incognito Browsing**



## Demo

Code block

```c#

var workspaceNo = "2";
string[] froms = 
{
	@$"C:\git\Data.dll",
	@$"C:\git\.config"
};

foreach(var from in froms)
{
	copyDll(from);
}
```



Sorted List

1. This is first item
2. This is second item
3. This is third item



Todo List

- [ ] Todo 1
- [x] Todo 2
- [x] Todo 3
- [ ] Todo 4
