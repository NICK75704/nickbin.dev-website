export default class FileSystem {
    constructor() {
        this.d = {}; 
    } 

    load(data) {
        this.d = data; 
    } 

    get(path) {
        if (path.length === 1) {
            return { path: path, directory: Object.values(this.d) }; 
        } 

        let dir = this.d; 
        let newPath = [ path[0] ]; 

        for (let i = 1; i < path.length-1; i++) {
            if (this.d[path[i]]) {
                dir = this.d[path[i].text].content; 
                newPath.push({ 
                    type: (typeof this.d[path[i].text].content === "object") ? "folder" : "file", 
                    text: this.d[path[i]].metadata.name 
                }); 
            } else {
                return null; 
            } 
        } 

        if (!dir[path[path.length-1].text]) {
            return null; 
        } 

        newPath.push({ 
            type: (typeof this.d[path[path.length-1].text].content ? "folder" : "file"), 
            text: this.d[path[path.length-1].text].metadata.name 
        }); 
        return { path: newPath, directory: Object.values(dir[path[path.length-1].text].content) }; 
    } 
}