---
title: Bu Siteyi Nasıl Oluşturdum
date: 2022-03-16
tags:
  - Svelte
  - SvelteKit
  - SSG
---

Uzun zamandır aklımda kolayca içerik üretebileceğim, hızlı,
sade bir blog yapmak vardı. Pek çok farklı şekilde iyi-kötü(çoğunlukla kötü)
kendim için blog sayfaları oluşturmuştum. Backendini kendim yazdığım da oldu,
sadece frontendini yazıp backendini [Strapi]()'ye verdiğim de. Ama hep
bir şeyler istediğim gibi olmuyordu. Bir türlü ihtiyaçlarımı tam anlamıyla
karşılayacak bir web sitesi yapamamıştım kendime. Ama son 1 haftadır
Svelte ve SvelteKit ile istediğim siteyi oluşturduğumu düşünüyorum.
Bu yazıda bu web sitesini nasıl oluşturduğumu, Svelte ve SvelteKit ile
neler öğrendiğimi, SvelteKit'in modern web geliştime (SSR, SSG vb.) yöntemlerini
nasıl kullandığını anlatacağım.

## İhtiyaçlarım

Websitesini yapmaya girişmeden önce ihtiyaçlarımı belirlemeye karar verdim.
Bunlar:

- Olabildiğince sade bir tasarım.

Websitemin daha çok içeriğe odaklı olması
gerektiğini düşündüğüm için, içeriği ön plana alacak şeklide bir
tasarım düşündüm. [Bu](https://antfu.me/),
[bu](https://www.aleksandrhovhannisyan.com/) ve
[bu](https://ademilter.com/) sitelerden ilham aldığım söylenebilir.

- Hız

Yaptığım şey altı üstü blog post paylaşmak. Bu dönemde böyle bir iş
çok fazla kaynak tüketmese gerek. Dolayısıyla sitenin ve sayfaların açılış
hızı olabilidiğince hızlı olmalı.

- Hızlıca içerik üretebilme

Önceki denediğim sistemlerde,mbir şeyler paylaşmak
hiç kolay değildi. Kolaycadan kastım şu: Aklıma gelen veya paylaşmak
istediğim bir şeyi telefonda olsam bile yazıp tek tuşla yayına almak.

- Bol özellikli makale yazma formatı

Bir yazılım geliştirici olduğum için aşına olduğum metin yazma formatı
`markdown`. Ama sadece bu da yetmiyor, yeri geliyor makalede interaktif
bir şeyler yapabilmek istiyorum. Ayırca kod formatlama, syntax highlighting
de gelişmiş olmalı.

## Neler kullandım

- [Svelte]() - _Kullandığım frontend framework_
- [SvelteKit]() - _Svelte ile birlikte çalışan, server-side-rendering (SSR),
  static-site-generator (SSG) için framework_
- [Tailwind]() - _CSS framework_
- [MDsveX]() - _Markdown ve SvelteKit ile birlikte çalışan, markdown dosyalarını
  process eden kütüphane_
- [Notion.io]() - _[snippets](/snippets) bölümü için kullandığım platform_
- [Upstash]() - Sayfaların ne kadar görüntülenme aldığını tutmak için `key-value`
  database
- [Raindrop.io]() - _[bookmarks](/bookmarks) bölümü için kullandığım platform_

## Başlayalım

Basitçe SvelteKit'i kullanarak projeyi oluşturuyorum.

```bash
$ npm init svelte@next awesome-blog
npx: installed 5 in 3.083s

create-svelte version 2.0.0-next.125

Welcome to SvelteKit!

This is beta software; expect bugs and missing features.

Problems? Open an issue on https://github.com/sveltejs/kit/issues if none exists already.

✔ Which Svelte app template? › Skeleton project
✔ Use TypeScript? … No / Yes - yes
✔ Add ESLint for code linting? … No / Yes - yes
✔ Add Prettier for code formatting? … No / Yes - yes
✔ Add Playwright for browser testing? … No / Yes - no

Your project is ready!

$ cd awesome-blog
$ yarn install
$ yarn dev
```

Dosya yapısına bakalım.

```bash
$  tree -L 3  -C --dirsfirst
.
├── src
│   ├── routes
│   │   └── index.svelte
│   ├── app.d.ts
│   └── app.html
├── static
│   └── favicon.png
├── README.md
├── package.json
├── svelte.config.js
└── tsconfig.json

3 directories, 8 files
```

Gördüğünüz gibi SvelteKit, oldukça sade bir dosya yapısıyla geliyor.
`/routes` dizinindeki `.svelte` dosyaları sitemizin yollarını belirliyor.
`index.svlete` ana sayfa içeriğimiz oluyor.

```bash
$ yarn dev
```

![](./img.png)

Güzel sayfayı istediğimiz gibi değiştirebilriz

```svelte
<h1>Awesome Blog!</h1>

<h3>Posts</h3>
<p>Blog posts will be here.</p>
```

![](./img_4.png)

Hemen başka sayfalar ekleyebiliriz. Mesela `/about`.

```svelte
<!--/routes/about.svelte-->
<h1>About me</h1>

<h3>👋 Hi</h3>

<p>
	I am a software developer with a passion for creating beautiful, intuitive, and user-friendly
	applications.
</p>
```

![](./img_2.png)

### Layout eklemek
Çoğu sitede sayfalar değişe bile değişmeyecek yerler vardır.
Mesela `header` çok fazla değişmez. İşte bunun gibi durumlarda
her sayfaya `header` yazmak yerine SvelteKit'in bize sağladığı
`__layout.svelte` den yararlanabiliriz.  `__layout.svelte` dosyasının 
ismi SvelteKit için özeldir.

```svelte
<!-- __layout.svelte -->
<header>Hi, I'm a header</header>

<main>
	<slot />
</main>

<footer>Hello, I'm the footer.</footer>

```

![](./img_5.png)

### Markdown Destekli Sayfalar

Bunun için [mdsvex](https://mdsvex.pngwn.io/) kullancağız.
Mdsvex kısaca `/routes` dizinini içine `markdown` dosyaları da
yazmamızı sağlıyor.
