/**
 * Simple Post Message JS wrapper
 * for the React native webview
 */

export const PostMessage = (w) => {
    let webView = w;
    return {
        postMessage: (data) => {
            if (webView) {
                webView.postMessage(JSON.stringify({data:data}));
            }
        }
    }
};

/**
 * Convert array data to string
 */
export const StringToData = (data) => {
    let dt = "updateData([";
    data.forEach((v, i) => {
        dt += v+",";
    });
    dt += "]);"
    return dt;
};