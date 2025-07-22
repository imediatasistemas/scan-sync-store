import { useRef, useEffect, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, X, RotateCcw } from 'lucide-react';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

export const BarcodeScanner = ({ onScan, onClose }: BarcodeScannerProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    codeReader.current = new BrowserMultiFormatReader();
    return () => {
      if (codeReader.current) {
        codeReader.current.reset();
      }
    };
  }, []);

  const startScanning = async () => {
    if (!webcamRef.current || !codeReader.current) return;
    
    setIsScanning(true);
    
    try {
      const videoElement = webcamRef.current.video;
      if (!videoElement) return;

      await codeReader.current.decodeFromVideoDevice(
        undefined,
        videoElement,
        (result, error) => {
          if (result) {
            onScan(result.getText());
            setIsScanning(false);
          }
          if (error && error.name !== 'NotFoundException') {
            console.error('Scanner error:', error);
          }
        }
      );
    } catch (error) {
      console.error('Error starting scanner:', error);
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (codeReader.current) {
      codeReader.current.reset();
    }
    setIsScanning(false);
  };

  const toggleCamera = () => {
    stopScanning();
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: facingMode
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex-1 relative">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="w-full h-full object-cover"
        />
        
        {/* Scanner overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-64 h-64 border-2 border-white/50 rounded-lg relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary"></div>
            </div>
            <p className="text-white text-center mt-4 text-lg">
              {isScanning ? 'Escaneando...' : 'Posicione o código de barras'}
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <Card className="m-4 bg-black/80 border-white/20">
        <CardContent className="p-4">
          <div className="flex justify-between items-center gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4 mr-2" />
              Fechar
            </Button>
            
            <Button
              variant="outline"
              onClick={toggleCamera}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Câmera
            </Button>
            
            {!isScanning ? (
              <Button
                onClick={startScanning}
                className="bg-primary text-white hover:bg-primary/90"
              >
                <Camera className="h-4 w-4 mr-2" />
                Escanear
              </Button>
            ) : (
              <Button
                onClick={stopScanning}
                variant="destructive"
              >
                Parar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};