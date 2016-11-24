var ajax = (function () {
  // cache necessary DOM elements
  var $wrapper = $('#WRAPPER');
  var $container = $('#CONTENT');
  var $handlers = $('.js-ajax-handler');

  // bind links to ajax.init
  $handlers.on('click', init);

  // pull href to new page, stop browser from jumping to it
  function init(event) {
    var handlerURL = event.currentTarget.href;
    event.preventDefault();

    checkWrapper(handlerURL);
    loadContent(handlerURL);
    correctHistory(handlerURL);
  }

  function checkWrapper(url) {
    if (url.indexOf('blog') >= 0) {
      $wrapper.addClass('narrow-wrapper');
    } else {
      $wrapper.removeClass('narrow-wrapper');
    }
  }

  // filter out #ABOUT from new page and inject its contents
  function loadContent(url) {
    $container.load(url + " #CONTENT > *");
  }

  // ensure back/forward browser capability
  function correctHistory(url) {
    history.pushState(url, null, url);
  }

  // make the following accessible to public
  return {
    init: init,
    loadContent: loadContent
  };
})();

// match content when back/forward buttons are clicked
window.addEventListener('popstate', function(event) {
  var state = event.state;

  if (state == null) {
    ajax.loadContent('/index.html');
  } else {
    ajax.loadContent(state);
  }
});
