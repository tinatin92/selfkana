import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const Canva = () => {
  const [isDrawing, setIsDrawing] = useState(false);

  const [strokeColor, setStrokeColor] = useState("white");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // Clear only the content (not resetting dimensions)
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Redraw the grid
        drawGrid(context, canvas.width / 2, canvas.height / 2);

        // Redraw the character
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const parent = canvas.parentElement;

      if (parent) {
        // Ensure dimensions are set only once
        canvas.width = parent.clientWidth * 2; // Multiply for higher resolution
        canvas.height = parent.clientHeight * 2;

        canvas.style.width = `${parent.clientWidth}px`;
        canvas.style.height = `${parent.clientHeight}px`;

        const context = canvas.getContext("2d");
        if (context) {
          context.scale(2, 2); // Scale for sharpness
          context.lineCap = "round";
          context.strokeStyle = strokeColor;
          context.lineWidth = 5;
          contextRef.current = context;

          // Draw grid initially
          drawGrid(context, canvas.width / 2, canvas.height / 2);

          // Draw the initial character
        }
      }
    }
  }, [strokeColor]);

  const drawGrid = (
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
  ) => {
    const originalLineWidth = context.lineWidth; // Store the original lineWidth
    const originalStrokeStyle = context.strokeStyle; // Store the original strokeStyle

    context.lineWidth = 0.5; // Set grid stroke width
    context.strokeStyle = "rgba(255, 255, 255, 0.3)"; // Set grid stroke color

    for (let x = 0; x <= width; x += 50) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }

    for (let y = 0; y <= height; y += 50) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }

    // Restore the original lineWidth and strokeStyle for drawing
    context.lineWidth = originalLineWidth;
    context.strokeStyle = originalStrokeStyle;
  };

  const startDrawing = ({
    nativeEvent,
  }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const finishDrawing = () => {
    if (contextRef.current) {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;
    contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(contextRef.current, canvas.width / 2, canvas.height / 2);
  };

  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "practice.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <div className="text-center bg-customGray rounded-3xl overflow-hidden w-full h-[600px]">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          className="border-[12px]  border-white rounded-3xl block"
        />
      </div>
      <div className="flex justify-between p-4 gap-6">
        <Button className="w-full" onClick={clearCanvas}>
          Clear
        </Button>
        <Button variant={"secondary"} className="w-full" onClick={saveCanvas}>
          Save
        </Button>

        <select
          onChange={(e) => setStrokeColor(e.target.value)}
          defaultValue="white"
        >
          <option value="white">White</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
      </div>
    </div>
  );
};

export default Canva;
