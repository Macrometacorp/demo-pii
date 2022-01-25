export default () => {
  return (
    <div id='#progressModal' className="modal modal-open">
        <div className="modal-box">
        <div className="flex items-center justify-center space-x-2">
          <p className="mb-1 text-2xl font-400">Uploading</p> 
          <div className="flex items-center justify-center space-x-2 animate-pulse">
            <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
            <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
          </div>
        </div>
        </div>
    </div>
  );
};
