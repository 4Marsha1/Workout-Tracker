import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store";
import Home from "./components/Home";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home />}
                        key="route-home-screen"
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
