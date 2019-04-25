# Personal Website

My personal web site, using a derivative of the Spectral theme by [arkandriver](https://github.com/arkadianriver/arkadianriver.com).
Spectral originally created by [@ajlkn](http://twitter.com/ajlkn).

## To use for your own site

1. Personalize the information in the YAML files.

   File | Action
   -----|-------
   **`_config.yml`** | Replace the values for each key with your info.
   **`_data/tokens.yml`** | Create this file, using `_data/tokens-template.yml` as an example.
   **`_data/authors.yml`** | Add author info for yourself as the first entry in the file.

1. Personalize the images with your own, and change the attribution for your new banner
   at the bottom of `_data/credits.yml`.

   Image | Description
   ------|------------
   **`banner.jpg`** | The main large image on the front page
   **`pic01.jpg`** | The topics image
   **`pic02.jpg`** | The works image

1. From the repo's root directory, start Jekyll to preview as you write.
   
   ```
   bundle exec jekyll serve --future --drafts
   ```
      
1. Open a browser to http://localhost:4000 (or the port number that jekyll indicates to open).

1. Compose your first post!

   ```
   ruby compose.rb
   ```

   The User Guide describes some features that might be useful: http://localhost:4000/topics/user-guide/

1. Test and publish your site:

   If you're building your site on Windows (like me) you can use the `site.bat` file;
   otherwise, just use the Jekyll commands.

## License
MIT

