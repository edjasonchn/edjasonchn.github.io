---
layout: single
title: "Off Campus"
permalink: /hobby/
author_profile: false
body_class: off-campus-page
---

<link rel="stylesheet" href="{{ '/assets/css/hobby.css' | relative_url }}">


<div class="hobby-grid">
{% for hobby in site.data.hobbies %}
  <section class="hobby-card hobby-card--{{ hobby.id }}" aria-labelledby="{{ hobby.id }}-title" data-gallery>
    <header class="hobby-card__header">
      <span class="hobby-card__number" aria-hidden="true">0{{ forloop.index }}</span>
      <div>
        <h2 id="{{ hobby.id }}-title">{{ hobby.title | escape }}</h2>
        <p>{{ hobby.description | escape }}</p>
      </div>
    </header>
    <div class="hobby-track" id="{{ hobby.id }}-slides" tabindex="0" role="region" aria-roledescription="carousel" aria-label="{{ hobby.title | escape }} photos. Use left and right arrow keys to browse.">
      {% if hobby.photos.size > 0 %}
        {% for photo in hobby.photos %}
        <figure class="hobby-slide" role="group" aria-roledescription="slide" aria-label="{{ forloop.index }} of {{ forloop.length }}">
          <img src="{{ photo.image | relative_url }}" alt="{{ photo.alt | escape }}" loading="lazy" decoding="async" width="960" height="640">
          <figcaption><span>{{ photo.caption | escape }}</span>{% if photo.location %}<span class="hobby-slide__location">{{ photo.location | escape }}</span>{% endif %}</figcaption>
        </figure>
        {% endfor %}
      {% else %}
        {% for slot in (1..3) %}
        <figure class="hobby-slide hobby-slide--placeholder" role="group" aria-roledescription="slide" aria-label="Placeholder {{ slot }} of 3">
          <div class="hobby-placeholder">
            <span class="hobby-placeholder__frame" aria-hidden="true">0{{ slot }}</span>
            <span>Photos coming soon</span>
          </div>
          <figcaption><span>{{ hobby.title | escape }}</span><span class="hobby-slide__location">Photo {{ slot }} · Preview</span></figcaption>
        </figure>
        {% endfor %}
      {% endif %}
    </div>
    <div class="hobby-controls" hidden>
      <span class="hobby-counter" aria-live="polite" aria-atomic="true"></span>
      <div class="hobby-controls__buttons">
        <button type="button" data-direction="-1" aria-controls="{{ hobby.id }}-slides" aria-label="Previous {{ hobby.title | escape }} photo"><span aria-hidden="true">&larr;</span></button>
        <button type="button" data-direction="1" aria-controls="{{ hobby.id }}-slides" aria-label="Next {{ hobby.title | escape }} photo"><span aria-hidden="true">&rarr;</span></button>
      </div>
    </div>
  </section>
{% endfor %}
</div>

<script src="{{ '/assets/js/hobby.js' | relative_url }}" defer></script>
