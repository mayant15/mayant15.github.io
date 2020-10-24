---
layout: page
permalink: /articles/
title: "Articles"
pagination:
  enabled: true
---

<ul class="post-list">
  {% for post in paginator.posts %}
    {% include post/preview.html %}
  {% endfor %}
</ul>

{% include page/pagination.html %}
</div>