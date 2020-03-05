import React from 'react'

interface FileProps {
    uplodeFile(e:  React.ChangeEvent<HTMLInputElement>):void
}


export const FileInput: React.FC<FileProps> = (props: FileProps)=>{
    
    const {uplodeFile}=props;
    return(
      <div>
        <input type="file" name="docx" onChange={uplodeFile} />
      </div>
    )
  }

