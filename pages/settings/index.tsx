import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Input } from 'reactstrap';

const defaultCamera: MediaDeviceInfo = {
    deviceId: '',
    groupId: '',
    label: '',
    kind: 'videoinput',
    toJSON: () => { }
}

export default function Settings() {
    const [cameras, setCameras] = useState<Array<MediaDeviceInfo>>([]);
    const [camera1, setCamera1] = useState<MediaDeviceInfo>(defaultCamera);
    const [camera2, setCamera2] = useState<MediaDeviceInfo>(defaultCamera);

    useEffect(() => {
        const initCameras = async () => {
            const cameras = await getCameras();
            setCameras(cameras);
        }
        initCameras();
    }, []);

    return (
        <Container>
            <SelectCamera
                cameraName={'Camera One'}
                cameras={cameras}
                selectedCamera={camera1}
                setSelectedCamera={setCamera1}
            />
            <SelectCamera
                cameraName={'Camera Two'}
                cameras={cameras}
                selectedCamera={camera2}
                setSelectedCamera={setCamera2}
            />
        </Container>
    );
};

export const getServerSideProps = withPageAuthRequired();

const SelectCamera = ({
    cameraName,
    cameras,
    selectedCamera,
    setSelectedCamera
}: {
    cameraName: string;
    cameras: Array<MediaDeviceInfo>;
    selectedCamera: MediaDeviceInfo,
    setSelectedCamera: React.Dispatch<React.SetStateAction<MediaDeviceInfo>>;
}) => {

    const handleSelect = (deviceId: string) => {
        const item = cameras.find(c => c.deviceId === deviceId);
        if (!item) return;
        setSelectedCamera(item);
    }

    return (
        <div>
            <h5>Select {cameraName}</h5>
            <h6>{selectedCamera.label || 'None'}</h6>
            <Input type={'select'} value={selectedCamera.deviceId} onChange={(e) => handleSelect(e.target.value)}>
                <option value={''}></option>
                {
                    cameras.map((item) => (
                        <option value={item.deviceId} key={item.deviceId}>{item.label}</option>
                    ))
                }
            </Input>
            <CameraFeed 
                deviceId={selectedCamera.deviceId}
            />
        </div>
    );
}

const CameraFeed = ({ 
    deviceId 
}: {
    deviceId: string;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        async function initCamera() {
            if (deviceId && videoRef.current) {
                const constraints = {
                    video: { deviceId: { exact: deviceId } }
                };
                try {
                    const stream = await navigator.mediaDevices.getUserMedia(constraints);
                    videoRef.current.srcObject = stream;
                } catch (error) {
                    console.error('Error accessing the camera', error);
                    // Handle errors (for example: user denied camera access)
                }
            }
        }

        initCamera();

        // Cleanup function to stop the video stream when the component unmounts
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                // @ts-ignore
                const tracks = videoRef.current.srcObject.getTracks();
                // @ts-ignore
                tracks.forEach(track => track.stop());
            }
        };
    }, [deviceId]); // Re-run effect if deviceId changes

    return (
        <CameraView>
            <video ref={videoRef} autoPlay muted playsInline width="100%"></video>
            {/* muted and playsInline are often necessary for autoplay to work on mobile browsers */}
        </CameraView>
    );
};


async function getCameras() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === 'videoinput');
}


const Container = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 25px;
`;

const CameraView = styled.div`
    width: 500px;
    height: 300px;
`;