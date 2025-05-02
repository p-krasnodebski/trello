console.log('Power-Up jest ładowany!');

window.TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    return [{
      text: 'Test Button',
      callback: function(t) {
        alert('Przycisk działa!');
        return t.popup({
          title: 'Test Popup',
          url: './test.html',
          height: 200
        });
      }
    }];
  }
});