import {
  bugAdded,
  bugResolved,
  getUnresolvedBugs,
  bugAssignedToUser,
  getBugsByUser,
} from "./store/bugs";
import configureStore from "./store/configureStore";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";

const store = configureStore();

store.dispatch(userAdded({ name: "User 1" }));
store.dispatch(userAdded({ name: "User 2" }));
store.dispatch(projectAdded({ name: "Project 1" }));
store.dispatch(bugAdded({ description: "Bug 1" }));
store.dispatch(bugAdded({ description: "Bug 2" }));
store.dispatch(bugAdded({ description: "Bug 3" }));
store.dispatch(bugResolved({ id: 1 }));
store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));

store.dispatch({
  type: "apiCallBegan",
  payload: {
    url: "/bugs",
    // method: "get", by default jest get
    // data: {},
    onSuccess: "bugsReceived",
    onError: "apiRequestFailed",
  },
});

const unresolvedBugs = getUnresolvedBugs(store.getState()); //aktualny stan store
console.log(unresolvedBugs);

const bugs = getBugsByUser(1)(store.getState());
console.log(bugs);

const App = () => {
  return <div>Hello World</div>;
};

export default App;
