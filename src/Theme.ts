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
            "main": "#039be5",
            "dark": "rgba(74, 144, 226, 1)",
            "contrastText": "#fff"
        },
        "secondary": {
            "light": "#4ffcff",
            "main": "#fff",
            "dark": "#22c5bb",
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
