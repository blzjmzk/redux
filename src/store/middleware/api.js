import axios from "axios";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== "apiCallBegan") return next(action);
    //walidacja: jesli nie działa przechodzimy od razu do następnego middleware
    next(action); //przekazujemy akcję do następnej funkcji middleware by była dostępna w dev tools
    const { url, method, data, onSuccess, onError } = action.payload;

    //robimy api call
    try {
      const response = await axios.request({
        baseURL: "http://localhost:3001/api", //w normalnej aplikacji przechowujemy w env
        url, //url to nie pełne url, tylko endpoint, stąd musimy dodać base
        method,
        data,
      });
      dispatch({ type: onSuccess, payload: response.data }); //jesli ok
    } catch (error) {
      dispatch({ type: onError, payload: error });
    }
  };
export default api;
