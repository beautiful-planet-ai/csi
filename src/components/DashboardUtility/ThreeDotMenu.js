import React, { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

const ThreeDotMenu = () => {
  const menu = useRef(null); // Create a ref for the Menu component

  // Define menu items
  const items = [
    {
      label: 'Upload',
      icon: 'pi pi-upload',
      command: () => handleUpload(), // Implement your upload logic here
    },
    {
      label: 'Modify',
      icon: 'pi pi-pencil',
      command: () => handleModify(), // Implement your modify logic here
    },
    {
      label: 'Download Template',
      icon: 'pi pi-download',
      command: () => handleDownload(), // Implement your download logic here
    },
  ];

  const handleUpload = () => {
    console.log('Upload clicked');
    // Add your upload logic here
  };

  const handleModify = () => {
    console.log('Modify clicked');
    // Add your modify logic here
  };

  const handleDownload = () => {
    console.log('Download clicked');
    // Add your download logic here
  };

  return (
    <div className="flex align-items-center">
      <Button 
        icon="pi pi-ellipsis-v" 
        onClick={(e) => menu.current.toggle(e)} 
        className="bg-primary1"
        raised 
      />
      <Menu model={items} ref={menu} popup />
    </div>
  );
};

export default ThreeDotMenu;
