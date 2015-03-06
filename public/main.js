(function(exports){

  function ChatApp() {

  }


  /*
   * router
   */

  function Router(url, callback) {

  }

  Router.prototype.getContents = function() {

  }



  function PjaxRouter(url, callback) {
    Router.call(this, arguments);
  }

  inherits(PjaxRouter, Router);


  function HashRouter(url, callback) {
    Router.call(this, arguments);
  }

  inherits(HashRouter, Router);



  /*
   * contacts contructure
   */
  function Contacts() {

  }


  function Group() {

  }


  function Favorate() {
    Group.call(this, arguments);
  }

  inherits(Favorate, Group);

  /*
   * chat room contructure
   */
  function Room() {

  }





  $(function() {
    var $body = $('body');

    $body.on('click', 'a', function(event) {
      var url = {}
        , a = this;
      // var url_params = this.href.match(/^((.*:)\/\/(([\w\-.]+):?([0-9]+)?))(\/[^?#]+?)?(\?[^#]+)?(#.*)?$/);

      ['href','origin','protocol','host','hostname','port','pathname','search','hash'].forEach(function(name) {
        url[name] = a[name];
      });

      //if (this.origin === window.location.origin) {
      if (this.host === window.location.host) {
        // pjax route
        if (this.pathname !== window.location.pathname) {
          event.preventDefault();
          console.log('pjax');
          window.history.pushState({"a":"b"},'title'+this.pathname,this.pathname);
          pjaxRoute(this.pathname);
        }

        //hash change route
        else if (this.hash !== window.location.hash) {
          console.log('hash change');
        } else {
          event.preventDefault();
        }
      }
    });



    //for back/forward button
    window.onpopstate = function(event) {
      console.log('onpopstate', event);
      pjaxRoute(window.location.pathname);
    };



    window.onhashchange = function(event) {
      //event.preventDefault();
      // var oldURL = event.oldURL
      //   , newURL = event.newURL;
      console.log('onhashchange', event);
      hashRoute(window.location.pathname);
    };

  });


  function pjaxRoute(path, container) {
    $.ajax({
      'url': path,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('X-PJAX', 'true');
        //xhr.setRequestHeader('X-PJAX-Container', '#contents');
      },
      'success': function(data, status, xhr) {
        //console.log('data', data, status, xhr);
        var pjax_container = xhr.getAllResponseHeaders();
        $('#room').html(data);
        //console.log(pjax_container);
      }
    })
  }



  function hashRoute(hash) {

  }




  /* ***************************
   * local functions
   **************************** */
  //add zeros
  function addZero(num, digit) {
    num = Number(num);
    digit = digit || 2;

    if (isNaN(num) || digit < 0) {
      return num;
    }

    num = num.toString();

    if (num.length < digit) {
      num = new Array(digit-num.length+1).join('0') + num;
    }

    return num;
  }


  function storage(key, val) {
    try {
      var storage = JSON.parse(localStorage['debug'] || '{}');

      if (key && key.constructor == Object) {
        localStorage['debug'] = JSON.stringify(key);
        //console.log('storage saved', localStorage['debug']);
      } else if (key === undefined) {
        return storage;
      } else if (val === undefined) {
        return storage[key];
      } else {
        storage[key] = val;
        localStorage['debug'] = JSON.stringify(storage);
      }

    } catch(e) {
      console.warn('LocalStorage: object parse error', e, key);
      return null;
    }
  };


  function inherits(ctor, superCtor) {
    //ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  }

  function getFuncName(func) {
    var results = (/function (.{1,})\(/).exec(func.toString());
    return (results && results.length > 1) ? results[1] : "";
  }


  String.prototype.toCamelCase = function(){
    return this.replace(/(-|_| )[a-z]{1}/g, function(r){
      return r.replace(/(-|_| )/,'').toUpperCase();
    });
  };


  exports.app = new ChatApp();

})(this);