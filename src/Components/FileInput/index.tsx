import React from 'react'

interface FileProps {
    uplodeFile(event:  React.ChangeEvent<HTMLInputElement>):void
}


export const FileInput: React.FC<FileProps> = (props: FileProps)=>{
    
    const {uplodeFile}=props;
    return(
      <div>
        <input type="file" name="docx" onChange={uplodeFile} />
        <input type="button" onClick={} value="Upload" />
      </div>
    )
  }

