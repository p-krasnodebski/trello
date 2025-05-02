// Inicjalizacja Power-Upa
window.TrelloPowerUp.initialize({
    // Nazwa Power-Upa
    'appName': 'Toggl Track Timer',
    
    // Ikona kart - pokazuje status timera
    'card-badges': function(t) {
      return t.get('member', 'private', 'togglApiToken')
        .then(function(togglApiToken) {
          if (!togglApiToken) {
            return [];
          }
          
          // Inicjalizacja API Toggl z zapisanym tokenem
          const togglApi = TogglAPI.init(togglApiToken);
          
          // Sprawdzenie aktualnego statusu timera
          return togglApi.getCurrentTimer()
            .then(function(timer) {
              if (timer && timer.id) {
                return [{
                  icon: './images/toggl-icon.png',
                  text: '⏱️ Aktywny',
                  color: 'red'
                }];
              }
              return [];
            })
            .catch(function() {
              return [];
            });
        });
    },
  
    // Przyciski karty - start/stop timera
    'card-buttons': function(t) {
      return [{
        icon: './images/toggl-icon.png',
        text: 'Toggl Timer',
        callback: function(t) {
          return t.get('member', 'private', 'togglApiToken')
            .then(function(togglApiToken) {
              if (!togglApiToken) {
                // Jeśli brak tokenu, pokazujemy popup autoryzacji
                return t.popup({
                  title: 'Autoryzacja Toggl',
                  url: './views/auth-popup.html',
                  height: 120
                });
              } else {
                // Jeśli token istnieje, pokazujemy popup timera
                return t.popup({
                  title: 'Toggl Timer',
                  url: './views/timer-popup.html',
                  height: 200
                });
              }
            });
        }
      }];
    },
    
    // Obsługa ustawień dla Power-Upa
    'show-settings': function(t) {
      return t.popup({
        title: 'Ustawienia Toggl Track',
        url: './views/auth-popup.html',
        height: 120
      });
    }
  });