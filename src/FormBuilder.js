import $ from "jquery";
import * as React from "react";

(window).jQuery = $;
(window).$ = $;

require("jquery-ui-sortable");
require("formBuilder");


//test implementazione del reducer
const initFormState = {
    formData: {},
    formCompiledData: {},
    formMode: ""
};

function formReducer(state, action) {
    //? gli passo action come argomento perchè poi nello switch lui lo usa e sa cosa fare
    switch (action.type) {
        case "initFormData":
            return {
                formData: action.data,
                formMode: "form-builder" //init form data
            };

        case "upFormData":
            return {
                ...state,
                formData: action.data,
                formMode: "form-builder" //update form data
            };
        case "upFormCompiledData":
            return {
                ...state,
                formCompiledData: action.data,
                formMode: "form-builded" //update form data
            };
        default:
            break;
    }
}


const formData = [
    {
        "type": "header",
        "subtype": "h1",
        "label": "ffffff"
    },
    {
        "type": "paragraph",
        "subtype": "p",
        "label": "This is a demonstration of formBuilder running in a React project."
    },
    {
        "type": "radio-group",
        "label": "Radio Group",
        "name": "radio-group-1649668789730",
        "values": [
            {
                "label": "Option 1",
                "value": "option-1"
            },
            {
                "label": "Option 2",
                "value": "option-2"
            },
            {
                "label": "Option 3",
                "value": "option-3"
            }
        ]
    },
    {
        "type": "select",
        "label": "Select",
        "className": "form-control",
        "name": "select-1649668791454",
        "values": [
            {
                "label": "Option 1",
                "value": "option-1",
                "selected": true
            },
            {
                "label": "Option 2",
                "value": "option-2"
            },
            {
                "label": "Option 3",
                "value": "option-3"
            }
        ]
    },
    {
        "type": "text",
        "label": "Text Field",
        "className": "form-control",
        "name": "text-1649668791913",
        "subtype": "text"
    },


];

function FormBuilder() {
    let formBuilder;

    const formBuilderRef = React.useRef();

    const options = {
        disabledActionButtons: ['data', 'clear'],
        scrollToFieldOnAdd: false,
        disabledAttrs: [
            'placeholder',
            'inline',
            'step',
            //'subtype',
            'description',
            'className',
            'required',
            'access',
            'other',
        ],
        dataType: 'json',
        formData: formData,
        editOnAdd: true,
        //qui salvo i fields direttamente alla chiusura dell'edit 
        onCloseFieldEdit: function (formData) {
            console.log('a field edit panel was closed', formData);
            localStorage.setItem("form-editing", formBuilder.actions.getData("json", true));
        },
        disableFields: [
            'autocomplete',
            'file',
            'starRating',
            'hidden',
            'button',
        ],
        disabledSubtypes: {
            text: ['password', 'output'],
        },
        fields: [
            {
                label: "File",
                type: "file",
                subtype: "file",
                icon: "✉"
            },
            {
                label: "Email",
                type: "text",
                subtype: "email",
                icon: "✉"
            },
            {
                label: "Formula Box",
                name: "Formula",
                type: "text",
                subtype: "Text Field",
                icon: "&"
            },
        ],
        controlConfig: {
            "file.fineuploader": {
                autoUpload: true
                // other fine uploader configuration options here
            }
        },
        onSave: function (evt, formGridData) {
            // toggleEdit();
            let data = JSON.stringify(formGridData);
            // alert(JSON.stringify(formGridData));
            // setFormGridDataEdit(data);
            console.log(data);
            // $('.fb-editor').formRender({ formGridData });
            window.sessionStorage.setItem('formDataCreated', formGridData);
        },
        // stickyControls: {
        //     enable: true,
        // },
        // actionButtons: [{
        //     id: 'render-form-builder',
        //     className: 'btn btn-success',
        //     label: 'Preview',
        //     type: 'button',
        //     events: {
        //         click: function (evt, formGridData) {
        //             $('.fb-editor').formRender().toggleEdit();
        //             $('.fb-editor').formRender({ formGridData });
        //             window.sessionStorage.setItem('formGridData', JSON.stringify(formGridData));
        //         },
        //     }
        // }],

        // layoutTemplates: {
        //     help: function (helpText) {
        //         return $('<div/>')
        //             .addClass('help')
        //             .append(helpText);
        //     },
        //     label: function (label, data) {
        //         // cheeky styling
        //         return $('<label class="bright" style="margin-top:15px;"/>')
        //             .attr('for', data.id)
        //             .append(label);
        //     }
        // },
    };

    formBuilder = $(formBuilderRef.current).formBuilder(options);


    const renderData = () => {
        return <div id="form-builder-container" ref={formBuilderRef} />;
    };

    return renderData();
};

export default FormBuilder;
