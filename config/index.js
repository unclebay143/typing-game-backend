import client from "./dbconfig";
// Controllers

// Callback function to handle response from the server
const callback = (func) => (err, res) => {
    if (err) {
        func(err);
    } else {
        func(null, res);
    }
};





// Export controller methods
export default {
  /**
    * Insert 1 game at a time only (for simplicity)
    * title - the game title as a string
    * platform - the game platform as a string
    * cb - the function that will handle error/success
    */
  add(title, platform, cb) {
    // TODO: 'insert' a new video game
  },

  // 'searchParams' is an Object with 'search parameters.'
  search(searchParams, cb) {
    // TODO: Search using either a hash/id or a value.
  },

  // 'id' is a string 
  delete(id, cb) {
    // TODO: Seek and destroy 🎸 using the given 'id'
  },
};