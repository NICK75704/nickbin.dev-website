import { useState } from "react"; 
import FileSystem from "./FileSystem"; 
import fs_data from "./fs.json"; 

// convert fs_data into recursive structure 

const breadcrumbIcons = {
    home: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
  </svg>, 
    folder: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M3.75 3A1.75 1.75 0 002 4.75v3.26a3.235 3.235 0 011.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM3.75 9A1.75 1.75 0 002 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-4.5A1.75 1.75 0 0016.25 9H3.75z" />
  </svg>, 
    file: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13z" />
  </svg> 
}; 

const fsIcons = {
    folder: (props) => <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 256 256"><g fill="none" strokeMiterlimit="10" fontFamily="none" fontSize="none" fontWeight="none" textAnchor="none" style={{ mixBlendMode: "normal" }}><path fill="#154c7a" d="M42 37.75H6a2 2 0 01-2-2V11a2 2 0 012-2h9.172a2 2 0 011.414.586l2.121 2.121a1 1 0 00.707.293H42a2 2 0 012 2v21.75a2 2 0 01-2 2z" transform="scale(5.33333)"></path><path fill="#279af1" d="M42 39.75H6a2 2 0 01-2-2V16a2 2 0 012-2h36a2 2 0 012 2v21.75a2 2 0 01-2 2z" transform="scale(5.33333)"></path></g></svg>, 
    link: (props) => <svg className={props.className} xmlns="http://www.w3.org/2000/svg" width="512" height="512" enableBackground="new 0 0 512 512" viewBox="0 0 267 267"><path fill="#279af1" d="M145.553 164.316l22.397-22.397c18.242-18.242 18.242-47.863 0-66.105s-47.862-18.242-66.104 0l-73.581 73.581c-18.242 18.242-18.242 47.862 0 66.104s47.863 18.242 66.105 0c5.211-5.211 5.211-13.672 0-18.883s-13.673-5.211-18.884 0c-7.82 7.82-20.517 7.82-28.337 0s-7.82-20.518 0-28.338l73.58-73.58c7.82-7.82 20.518-7.82 28.338 0s7.82 20.517 0 28.337l-22.397 22.397c-5.211 5.211-5.211 13.673 0 18.884s13.672 5.211 18.883 0z" data-original="#0793f6"></path><path fill="#154c7a" d="M115.97 107.494l-17.254 17.254c-18.242 18.242-18.242 47.862 0 66.104s47.863 18.242 66.105 0l73.58-73.58c18.242-18.242 18.242-47.863 0-66.105s-47.862-18.242-66.104 0c-5.211 5.211-5.211 13.673 0 18.884s13.672 5.211 18.883 0c7.82-7.82 20.518-7.82 28.338 0s7.82 20.517 0 28.337l-73.581 73.581c-7.82 7.82-20.517 7.82-28.337 0s-7.82-20.518 0-28.338l17.254-17.253c5.211-5.211 5.211-13.673 0-18.884s-13.673-5.211-18.884 0z" data-original="#077cf6"></path></svg> 
}; 

export default function FileExplorer() {
    const fs = new FileSystem(); 
    fs.load(fs_data); 

    const [fsPath, setFsPath] = useState([{ type: "home", text: "Home" }]); 
    const [currDir, setCurrDir] = useState(Object.values(fs.d)); 

    const DEFAULT_ZOOM = 18; 
    const [zoom, setZoom] = useState(DEFAULT_ZOOM); 
    // , { type: "folder", text: "Documents" }, { type: "folder", text: "Projects" }, { type: "folder", text: "nickbin" }, { type: "file", text: "README.md" }]); 

    // const getFsPath = (dir, callback) => {
    //     let path = []; 
    //     if (fsPath.map(item => item.text).includes(dir)) {
    //         path = fsPath.slice(0, fsPath.map(item => item.text).indexOf(dir) + 1); 
    //     } else {
    //         path = fsPath.concat({ type: "folder", text: dir }); 
    //     } 

    //     setFsPath(path); 
    //     callback(path); 
    // }; 

    // const getCurrDir = (path) => {
    //     if (path.length === 1) {
    //         setCurrDir(fs_data); 
    //         return; 
    //     } 

    //     let dirObj = fs_data.find(item => item.title === path[1].text).content; 
    //     console.log(dirObj); 
    //     path.map(item => item.text).slice(2).forEach(item => {
    //         console.log(item); 
    //         dirObj = dirObj[item].content; 
    //     }); 

    //     setCurrDir(dirObj); 
    // }; 

    const handle_cd = (dir) => {
        // console.log("run"); // debug 
        // getFsPath(dir, getCurrDir); 
        let data = fs.get(dir); 
        setCurrDir(data.directory); 
        setFsPath(data.path); 
    }; 

    const handleGoBack = e => {
        if (fsPath.length === 1) return; 
        let path = fsPath.slice(0, fsPath.length - 1); 
        handle_cd(path); 
    }; 

    return (
        <div className="relative mb-5 max-h-[80vh] bg-stone-800 border-none rounded-2xl">
            <div className="absolute bottom-0 left-0 flex justify-start items-center gap-4 px-5 py-3 w-full backdrop-blur-lg breadcrumbs text-nb-lightblue rounded-b-2xl z-10">
                <button className="text-stone-400 hover:text-stone-300 hover:translate-y-[-2px] hover:scale-105 transition-all" onClick={handleGoBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zM9 12.75a.75.75 0 000 1.5h6a.75.75 0 000-1.5H9z" clipRule="evenodd" />
                    </svg>
                </button>
                <ul>
                    {fsPath.map((path, index) => {
                        if (fsPath.length !== index+1) {
                            return (
                                <li key={index}>
                                    <a className="gap-1" onClick={() => handle_cd(fsPath.slice(0, index+1))}>
                                        {breadcrumbIcons[path.type]} 
                                        {path.text} 
                                    </a> 
                                </li> 
                            ); 
                        } else {
                            return (
                                <li className="text-stone-500 font-semibold gap-1" key={index}> 
                                    {breadcrumbIcons[path.type]} 
                                    {path.text} 
                                </li> 
                            ); 
                        } 
                    })} 
                </ul>
            </div>
            <div className="absolute bottom-0 right-0 flex justify-center items-center gap-4 px-5 py-3 z-10">
                <span className="text-stone-500 font-mono">{(zoom/DEFAULT_ZOOM).toFixed(2)}x</span> 
                <div>
                    <input className="range range-secondary range-sm z-20" type="range" min={DEFAULT_ZOOM*0.75} max={DEFAULT_ZOOM*1.1} step={DEFAULT_ZOOM*0.05} value={zoom} onChange={e => setZoom(parseFloat(e.target.value))} /> 
                    <div className="w-full flex justify-between text-xs px-2">
                        {Array.from(Array(5)).forEach(() => <span>|</span>)} 
                    </div>
                </div>
            </div>
            <div className="p-16 grid grid-cols-[repeat(auto-fit,_18rem)] justify-center justify-items-center gap-4 h-[80vh] overflow-auto overflow-x-hidden" style={{ gridTemplateColumns: `repeat(auto-fit, ${zoom}rem)` }}>
                {
                    fs.d ? 
                    currDir.map((item, index) => {
                        const ItemIcon = fsIcons[(typeof item.content === "string") ? "link": "folder"]; 

                        return (
                            <div className="group card card-compact w-full bg-transparent OFF-bg-stone-900 cursor-pointer hover:scale-105 transition-all" key={index} onClick={() => handle_cd([ ...fsPath, { type: (typeof item.content === "object") ? "folder" : "link", text: item.metadata.name }])}>
                                <figure className="px-10 pt-10 h-56 OFF-shadow-xl OFF-hover:shadow-2xl">
                                    <ItemIcon className="group-hover:drop-shadow-xl transition-all w-auto" /> 
                                </figure> 
                                <div className="card-body items-center text-center">
                                    <h2 className="card-title text-[1.4em] p-2 group-hover:bg-[rgba(255,255,255,0.1)] rounded-lg transition-all">
                                        {item.metadata.name}
                                        {typeof item.content === "object" && (
                                            <div className="tooltip tooltip-accent tooltip-bottom" data-tip={item.metadata.short_desc}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"> 
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" /> 
                                                </svg> 
                                            </div>
                                        )}
                                    </h2> 
                                    {/* <p className="h-max-auto text-stone-400">{item.description}</p>  */}
                                    {/* <div className="card-actions items-end">
                                        <button className="btn btn-primary shadow-[0_0_12px_0px_hsl(var(--p)/var(--tw-bg-opacity))] hover:shadow-[0_0_15px_2px_hsl(var(--p)/var(--tw-bg-opacity))]">View</button> 
                                    </div>  */}
                                </div> 
                            </div> 
                        ); 
                    }) : 
                    <p className="text-stone-500 font-semibold">No files yet, please start adding files!</p> 
                }
            </div>
        </div>
    ); 
}