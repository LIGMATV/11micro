# 11micro

**Live example: https://11micro.vercel.app/**  
Link in bio/digital identity that is truly yours, created statically + Feeds for Mastodon & Bluesky

## Features
 - Create instant notes or long-form metadatas
 - All components collapsible and anchored
 - Lightweight and fast
 - SVG-powered icons with Simple Icons
 - Featured/big links
 - Customizable, the code and styling is truly yours!
 - Feeds for Mastodon and Bluesky

## What is this?

It's like Linktree, you can add links and small notes but in specified quantities and customizations. The design is really inspired by Gravatar and Omg.lol. It's not have an really big button for each link, instead it's look like an neatly arranged list with icons.

## Configuration

All the configuration you needed to edit is just the [`_data/index.yaml`](_data/index.yaml).  
**But why use YAML and don't use JSON under hood?** It's make anyone easier to understanding on add data, also YAML supporting multiline code which is used in Notes. The code is neatly arranged and not confusing, without a GUI, almost anyone can understand a code layout like this.  
To make this YAML data works, we using `js-yaml` package.

You may see an comments in that file like `# Site configuration` or `# Notes (Markdown supported!)`. You can learn from that and starting to edit your datas.

### Site configuration


```yaml
# Site configuration
lang: en
favicon: "/favicon.svg"
repo: "https://github.com/LIGMATV/11micro"
primary: "#ff6363"
secondary: "#8163ff"
```

### Basic biodata
<img src="https://i.imgur.com/yt3xJCV.png" width="250" align="right">

```yaml
title: "Foo Bar"
pronouns: "they/them"
badges:
    pledge:
        title: "People Pledge"
        img: "/people_pledge.svg"
        url: "https://people.pledge.party/"
bio: "I'm foo bar, I'm not real, I'm just a placeholder. Sad, right?"
```
Note that the social links here is from `items.social`.

### Notes
<img src="https://i.imgur.com/9wK8Mos.png" width="300" align="right">

```yaml
# Notes (Markdown supported!)
notes:
    metadatas:
        title: "Metadatas"
        content: |-
            - 💼 Unemployment
            - 🗺️ 110.232.83.115
    alittleaboutme:
        title: "A little about me"
        content: |-
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. **Already scared?!**
            # Facts 💯💯 (just trust it)
            - 💻 I'm **not alive**. 
            - 🏫 I'm wake up _just when_ you see this.
```

### Items
<img src="https://i.imgur.com/CinvMWq.png" width="350" align="right">

```yaml
# Link items
items:
    social:
        title: Social
        github:
            title: "@foobar"
            url: https://github.com/foobar
        linkedin:
            title: "@foobar"
            url: "https://www.linkedin.com/in/foobar"
            # Source: https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/linkedin.svg
            customIcon: "<svg role='img' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><title>LinkedIn</title><path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/></svg>"
        mastodon: 
            title: "@foobar@mastodon.social"
            url: https://mastodon.social/@foobar
        bluesky: 
            title: "@foobar.bsky.social"
            url: https://bsky.app/profile/foobar.bsky.socia
    other:
        title: Other social
        gitlab:
            title: "@foobar"
            url: "https://gitlab.com/foobar"
        x:
            title: "@foobar"
            url: "https://x.com/foobar"
```
All the link items are have `rel="me"` attribute, so you can easily verify your links.

### Featured links
<img src="https://i.imgur.com/WfuGLR6.png" width="200" align="right">

```yaml
# Featured links
featured:
    foobar:
        title: Foo Bar
        11ty-beer:
            cover: "/personal-info.svg"
            title: "Free Personal Infos"
            summary: "I got it from Facebook, including your birthday even though your friends don't know it. Cool, right?"
            url: "https://github.com/facebook/hhvm"
        boredown:
            cover: "/hacking.jpg"
            title: "Hacking service"
            summary: "I have hacking service, atleast for your school computers."
            url: "https://undraw.co/"
```

### Feeds
<img src="https://i.imgur.com/Mzhhlp2.png" width="200" align="right">
<img src="https://i.imgur.com/QOLQnyE.jpeg" width="200" align="right">

```yaml
# Feeds
mastodon:
    instance: "https://mastodon.social"
    id: "13179"
    username: "Mastodon"
bluesky:
    username: "bsky.app"
```

Powered by [`@idotj/mastodon-embed-timeline`](https://gitlab.com/idotj/mastodon-embed-timeline) and [`bsky-embed`](https://github.com/Vincenius/bsky-embed). To add the Mastodon feed, you can [learn more here](https://dev.to/ligmatv/how-to-embed-your-mastodon-profile-478d).

<br><br><br><br>

# License

[GNU Affero General Public License v3.0](https://github.com/LIGMATV/11micro/blob/main/LICENSE)
