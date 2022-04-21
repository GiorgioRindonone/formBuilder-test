import $ from "jquery";
import React, {useRef, useState, useEffect} from "react";

(window).jQuery = $;
(window).$ = $;

require("jquery-ui-sortable");
require("formBuilder");
require("formBuilder/dist/form-render.min.js");

function FormBuilderWithRender() {
    //test implementazione del reducer
    const fb = useRef();
    const [form, setForm] = useState(null);
    const [pedalini, setPedalini] = useState(null);

    const formData = [
        {
            type: "header",
            subtype: "h1",
            label: "ffffff"
        },
        {
            type: "paragraph",
            subtype: "p",
            label:
                "This is a demonstration of formBuilder running in a React project."
        },
        {
            type: "radio-group",
            label: "Radio Group",
            name: "radio-group-1649668789730",
            values: [
                {
                    label: "Option 1",
                    value: "option-1"
                },
                {
                    label: "Option 2",
                    value: "option-2"
                },
                {
                    label: "Option 3",
                    value: "option-3"
                }
            ]
        },
        {
            type: "select",
            label: "Select",
            className: "form-control",
            name: "select-1649668791454",
            values: [
                {
                    label: "Option 1",
                    value: "option-1",
                    selected: true
                },
                {
                    label: "Option 2",
                    value: "option-2"
                },
                {
                    label: "Option 3",
                    value: "option-3"
                }
            ]
        },
        {
            type: "text",
            label: "Text Field",
            className: "form-control",
            name: "text-1649668791913",
            subtype: "text"
        },
        {
            type: "text",
            label: "Text Field",
            className: "form-control",
            name: "text-1649668797027",
            subtype: "text"
        },
        {
            type: "select",
            label: "Select",
            className: "form-control",
            name: "select-1649668797648",
            values: [
                {
                    label: "Option 1",
                    value: "option-1",
                    selected: true
                },
                {
                    label: "Option 2",
                    value: "option-2"
                },
                {
                    label: "Option 3",
                    value: "option-3"
                }
            ]
        }
    ];

    let formBuilder;
    let options2 = {
        disableFields: ["button", "header", "paragraph", "hidden"],
        disabledActionButtons: ["save"],
        editOnAdd: true,
        onClearAll: function (formData) {
            setForm(null);
        },
        formData: formData,
        onCloseFieldEdit: function (formData) {
            console.log("a field edit panel was closed", formData);
            localStorage.setItem(
                "form-editing",
                formBuilder.actions.getData("json", true)
            );
        },
        disabledAttrs: [
            "placeholder",
            "inline",
            "step",
            //'subtype',
            "description",
            "className",
            "required",
            "access",
            "other"
        ],
        actionButtons: [
            {
                id: "seeform",
                className: "btn btn-primary",
                label: "See Form",
                type: "button",
                events: {
                    click: function () {
                        $(() => {
                            let myxml = formBuilder.actions.getData("json", true);
                            //let myxml = ilForm.actions.getData("json", true);
                            let submit_btn = {
                                type: "button",
                                label: "Submit",
                                subtype: "submit",
                                className: "btn-light btn",
                                name: "submituniquebutton",
                                access: false,
                                style: "light"
                            };
                            let myxml2 = JSON.parse(myxml);
                            if (myxml2.length > 0) {
                                setForm(myxml);

                                var fbTemplate = document.getElementById("build-wrap"),
                                    options = {
                                        formData: myxml2.concat([submit_btn])
                                    };

                                $(fbTemplate).formRender(options);
                            } else {
                                alert("Add atleast one Field");
                            }
                        });
                    }
                }
            }
        ],
        fields: [
            {
                label: "File",
                type: "file",
                subtype: "file",
                icon: "✉"
            }
        ],
        controlConfig: {
            "file.fineuploader": {
                autoUpload: true
                // other fine uploader configuration options here
            }
        }
    };

    useEffect(() => {
        // Update the document title using the browser API
        (async function () {
            //seIlForm($(fb.current).formBuilder(options2));
            //const formBuilder = $(fb.current).formBuilder(options2);
            formBuilder = $(fb.current).formBuilder(options2);
            console.log("formBuilder useEffect", formBuilder);
        })();
    }, []);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        //target dell'oggetto
        var fbTemplate = document.getElementById("build-wrap");
        // attacco all'oggetto il formRender
        let userData = $(fbTemplate).formRender("userData");
        console.log(userData);
        var formData = new FormData(fbTemplate);

        function getObj(objs, key, val) {
            val = val.replace("[]", "");
            return objs.filter(function (obj) {
                var filter = false;
                if (val) {
                    filter = obj[key] === val;
                } else if (obj[key]) {
                    filter = true;
                }
                return filter;
            });
        }

        function setValue(name, value) {
            let field = getObj(userData, "name", name)[0];

            if (!field) {
                return;
            }

            if (
                ["select", "checkbox-group", "radio-group"].indexOf(field.type) !== -1
            ) {
                for (var fieldOption of field.values) {
                    if (value.indexOf(fieldOption.value) !== -1) {
                        fieldOption.selected = true;
                    } else {
                        delete fieldOption.selected;
                    }
                }
            } else {
                field.value = value[0];
            }
        }

        console.log("Original formData: ", userData);

        for (var key of formData.keys()) {
            setValue(key, formData.getAll(key));
        }

        console.log("Updated formData: ", userData);

        let toSendData = {};
        userData.forEach((item) => {
            if (item.type === "button" && item.subtype === "submit") {
                return 0;
            } else if (item.type === "file" || item.subtype === "file") {
                let field = item.label;
                let value = item.value;
                toSendData[field] = value;
            } else {
                let field = item.label;
                let value = item.userData[0];
                toSendData[field] = value;
                console.log(toSendData);
            }
        });
    };

    let sandali;

    const showPedalini = () => {
        //e.preventDefault();
        var fbTemplate = document.getElementById("fb-editor");
        //const formBuilder = $(fb.current).formBuilder.actions.getData;
        //console.log("pedalini", formBuilder.actions.getData("json", true));
        sandali = formBuilder.actions.getData("json", true);
        console.log("sandali", sandali);
        //calzini(sandali);
        console.log("formData", formData);

        console.log("pedalini 2", pedalini);
    };

    const calzini = (arg) => {
        setPedalini(arg);
        console.log("pedalini", arg);
        console.log("formData", formData);
    };

    return (
        <div className="App p-4">
            <div id="fb-editor" ref={fb} />
            <button id="pedalino" onClick={showPedalini}>
                PEDALINAMI
            </button>
            {form && (
                <form
                    id="build-wrap"
                    className="pt-3"
                    onSubmit={(e) => formSubmitHandler(e)}
                />
            )}
        </div>
    );
}

export default FormBuilderWithRender;
