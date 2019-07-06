import {createMuiTheme} from "@material-ui/core";

export const theme = createMuiTheme({
    "palette": {
        "common": {
            "black": "#000",
            "white": "#fff"
        },
        "background": {
            "paper": "rgba(255, 255, 255, 1)",
            "default": "#fafafa"
        },
        "primary": {
            "light": "#40c4ff",
            "main": "#64b5f6",
            "dark": "rgba(74, 144, 226, 1)",
            "contrastText": "#fff"
        },
        "secondary": {
            "light": "#ff4081",
            "main": "#fff",
            "dark": "#c51162",
            "contrastText": "#fff"
        },
        "error": {
            "light": "#2327e5",
            "main": "#001df4",
            "dark": "#0b18d3",
            "contrastText": "#fff"
        },
        "text": {
            "primary": "rgba(0, 0, 0, 0.87)",
            "secondary": "rgba(0, 0, 0, 0.54)",
            "disabled": "rgba(0, 0, 0, 0.38)",
            "hint": "rgba(0, 0, 0, 0.38)"
        }
    }
});
