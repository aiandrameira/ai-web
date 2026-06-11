import { DemoUploadDefaultComponent } from "./default";
import { DemoUploadDropzoneComponent } from "./dropzone";
import { DemoUploadMultipleComponent } from "./multiple";
import { DemoUploadSelectedComponent } from "./selected";

export const UPLOAD = {
    componentName: "upload",
    componentType: "upload",
    examples: [
        { name: "default", component: DemoUploadDefaultComponent },
        { name: "dropzone", component: DemoUploadDropzoneComponent },
        { name: "multiple", component: DemoUploadMultipleComponent },
        { name: "selected", component: DemoUploadSelectedComponent },
    ],
};

export { DemoUploadDefaultComponent, DemoUploadDropzoneComponent, DemoUploadMultipleComponent, DemoUploadSelectedComponent };
