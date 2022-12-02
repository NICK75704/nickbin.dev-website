import { ReactComponent as LogoBannerDark } from './brand_pkg/nickbin_banner_DARK.svg';
import FileExplorer from './FileExplorer'; 

function App() {
  return (
    <div className="flex flex-col w-screen h-screen bg-nb-black overflow-hidden">
      <LogoBannerDark className="my-5 mx-auto w-1/3 min-h-[10vh] transition-transform" style={{ filter: "drop-shadow(0 0 35px rgba(255, 255, 255, 0.8))" }} /> 
      <div className="px-10">
        <FileExplorer /> 
      </div> 
    </div> 
  );
}

export default App; 