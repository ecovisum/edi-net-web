# Draft landing page for EDI-Net

- [GitHub pages site](https://daveeveritt.github.io/edi-net-web/)
- [EDI-Net development site](http://edinet.ecovisum.com/)

## ToDo (code and style):

- [ ] use a photo or more colourful hero image
- [ ] run through WebAIM accessibility checker
- [ ] make plan style even more subtle
- [x] add "browse plans" link jump to slider
- [x] match menu with existing at all sizes
- [x] add conditional comment for IE
- [x] reserve primary colours for highlights
- [x] fix pricing tiers mobile styles
- [x] integrate tiers and style
- [x] create a white/pale background with magic squares app
- [x] set up basic above-the-fold content
- [x] move/create EDI-Net styles to match original
- [x] copy EDI-Net menu styles exactly
- [x] fix mobile vertical alignment and spacing

## ToDo (IA and planning):

- [x] domain URL is edinet.ecovisum.com
- [ ] add/edit remaining prototype content if relevant
- [ ] link to existing research project page
- [ ] decide if sub-sections/sub-nav needed
- [ ] investigate and compare online payments (Stripe?)
- [ ] have fallback for generating invoices (Markdownd->PDF)
- [ ] outline content inventory and store text

## Content to decide on later

- [ ] privacy policy and legal docs
- [ ] company address/phone (and Google map?)
- [ ] Google analytics
- [ ] Dublin Core metadata
- [ ] standard Google SEO stuff

## Errors to investigate

On pushing to server:

```
remote: Ref refs/heads/master received. Deploying master branch to production...
remote: warning: unable to unlink stored/images-proto/edi-net-logo.png: Permission denied
remote: warning: unable to unlink stored/images-proto/net.png: Permission denied
remote: warning: unable to unlink stored/images-proto/order4-all-880-trimmed-reverse.png: Permission denied
remote: warning: unable to unlink stored/predump/edi-net-people.jpg: Permission denied
remote: Already on 'master'`
```
