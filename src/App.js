import $ from "jquery";
import React from "react";
import "./App.css";
import FormBuilder from "./FormBuilder";
import FormBuilderWithRender from "./FormBuilderWithRender";
window.jQuery = $;
window.$ = $;



export function App() {
  
  return (
    <>
      <FormBuilderWithRender />
    </>
  );
}

//export default MemoisedApp = React.memo(App);
export default App;
