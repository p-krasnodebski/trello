// Funkcje do obsługi API Toggl Track
const TogglAPI = {
    apiToken: null,
  
    // Inicjalizacja API z tokenem
    init: function(apiToken) {
      this.apiToken = apiToken;
      return this;
    },
  
    // Autoryzacja użytkownika
    authenticate: function() {
      // Implementacja autoryzacji - zapisanie tokena API
      return new Promise((resolve, reject) => {
        // Tu można dodać kod autoryzacji poprzez Toggl API
        resolve(true);
      });
    },
  
    // Rozpoczęcie pomiaru czasu
    startTimer: function(description, projectId = null) {
      return fetch('https://api.track.toggl.com/api/v9/time_entries/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(this.apiToken + ':api_token')
        },
        body: JSON.stringify({
          description: description,
          created_with: 'Trello Power-Up',
          pid: projectId
        })
      })
      .then(response => response.json());
    },
  
    // Zatrzymanie aktualnego pomiaru czasu
    stopTimer: function() {
      return fetch('https://api.track.toggl.com/api/v9/time_entries/current/stop', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(this.apiToken + ':api_token')
        }
      })
      .then(response => response.json());
    },
  
    // Pobranie listy projektów
    getProjects: function() {
      return fetch('https://api.track.toggl.com/api/v9/me/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(this.apiToken + ':api_token')
        }
      })
      .then(response => response.json());
    },
  
    // Pobranie aktualnego statusu timera
    getCurrentTimer: function() {
      return fetch('https://api.track.toggl.com/api/v9/me/time_entries/current', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(this.apiToken + ':api_token')
        }
      })
      .then(response => response.json());
    }
  };