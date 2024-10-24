
"use client";

import { useRef, useEffect, useState } from 'react';

// Lista de figuras disponibles para agregar al canvas
const shapesList = [
    { type: 'circle', label: 'Círculo' },
    { type: 'rectangle', label: 'Rectángulo' },
    { type: 'arrow', label: 'Flecha' },
    { type: 'person', label: 'Sujeto' },
];

const Canvas = () => {
    // Referencia al canvas
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    // Estado para las figuras y textos en el canvas
    const [shapes, setShapes] = useState<any[]>([]);
    const [texts, setTexts] = useState<{ text: string; x: number; y: number }[]>([]);
    const [currentText, setCurrentText] = useState('');
    const [draggingItem, setDraggingItem] = useState<{ type: 'shape' | 'text'; index: number; offsetX: number; offsetY: number } | null>(null);

    // Inicia el arrastre de una figura o texto
    const handleDragStart = (event: React.DragEvent, itemType: 'shape' | 'text', index: number, offsetX: number = 0, offsetY: number = 0) => {
        setDraggingItem({ type: itemType, index, offsetX, offsetY });
    };

    // Maneja el evento de soltar una figura o texto
    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del navegador
        const rect = canvasRef.current?.getBoundingClientRect();
        const x = event.clientX - (rect ? rect.left : 0);
        const y = event.clientY - (rect ? rect.top : 0);

        // Si estamos arrastrando un elemento
        if (draggingItem) {
            if (draggingItem.type === 'shape') {
                const shape = shapesList[draggingItem.index];
                if (shape) {
                    setShapes((prev) => [
                        ...prev,
                        { type: shape.type, x, y },
                    ]);
                }
            } else if (draggingItem.type === 'text') {
                const textToDrag = texts[draggingItem.index];
                if (textToDrag) {
                    setTexts((prev) => [
                        ...prev.filter((_, i) => i !== draggingItem.index),
                        { ...textToDrag, x, y }
                    ]);
                }
            }
        }
        setDraggingItem(null); // Resetea el estado de arrastre
    };

    // Previene el comportamiento predeterminado para permitir el drop
    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    // Agrega texto al canvas
    const handleTextSubmit = () => {
        setTexts((prev) => [
            ...prev,
            { text: currentText, x: 100, y: 100 },
        ]);
        setCurrentText(''); // Limpia el campo de texto
    };

    // Dibuja una flecha
    const drawArrow = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number) => {
        const headLength = 10; // Longitud de la cabeza de la flecha
        const dx = toX - fromX;
        const dy = toY - fromY;
        const angle = Math.atan2(dy, dx);
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    };

    // Dibuja una figura humana
    const drawHuman = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        ctx.beginPath();
        ctx.arc(x, y - 20, 10, 0, Math.PI * 2); // Cabeza
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + 30); // Cuerpo
        ctx.moveTo(x, y + 30);
        ctx.lineTo(x - 15, y + 50); // Pierna izquierda
        ctx.moveTo(x, y + 30);
        ctx.lineTo(x + 15, y + 50); // Pierna derecha
        ctx.moveTo(x, y + 10);
        ctx.lineTo(x - 15, y + 10); // Brazo izquierdo
        ctx.moveTo(x, y + 10);
        ctx.lineTo(x + 15, y + 10); // Brazo derecho
        ctx.stroke();
    };

    // elementos en el canvas
    const drawElements = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            //ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Limpia el canvas
            shapes.forEach((shape) => {
                ctx.fillStyle = 'blue'; // Color de las figuras
                if (shape.type === 'circle') {
                    ctx.beginPath();
                    ctx.arc(shape.x, shape.y, 20, 0, Math.PI * 2);
                    ctx.fill();
                } else if (shape.type === 'rectangle') {
                    ctx.fillRect(shape.x - 20, shape.y - 20, 40, 40);
                } else if (shape.type === 'arrow') {
                    drawArrow(ctx, shape.x, shape.y, shape.x + 50, shape.y); // Dibuja flecha horizontal
                } else if (shape.type === 'person') {
                    drawHuman(ctx, shape.x, shape.y); // Dibuja figura humana
                }
                ctx.closePath();
            });

            texts.forEach((text) => {
                ctx.fillStyle = 'black'; // Color del texto
                ctx.fillText(text.text, text.x, text.y);
                ctx.strokeRect(text.x - 20, text.y - 20, 100, 30); // Visualiza el área del texto
            });
        }
    };

    useEffect(() => {
        drawElements(); // buele a dibujar los elementos
    }, [shapes, texts]);

    // Maneja el evento de clic para iniciar el arrastre
    const handleMouseDown = (event: React.MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        const mouseX = event.clientX - (rect ? rect.left : 0);
        const mouseY = event.clientY - (rect ? rect.top : 0);

        shapes.forEach((shape, index) => {
            if (shape.type === 'circle' && Math.hypot(shape.x - mouseX, shape.y - mouseY) < 20) {
                handleDragStart(event as any, 'shape', index, mouseX - shape.x, mouseY - shape.y);
            } else if (shape.type === 'rectangle' && mouseX > shape.x - 20 && mouseX < shape.x + 20 && mouseY > shape.y - 20 && mouseY < shape.y + 20) {
                handleDragStart(event as any, 'shape', index, mouseX - shape.x, mouseY - shape.y);
            } else if (shape.type === 'arrow') {
                // Detección sdeflecha
                if (mouseX > shape.x && mouseX < shape.x + 50 && mouseY > shape.y - 10 && mouseY < shape.y + 10) {
                    handleDragStart(event as any, 'shape', index, mouseX - shape.x, mouseY - shape.y);
                }
            } else if (shape.type === 'person') {
                // Detección sde humana
                if (mouseX > shape.x - 20 && mouseX < shape.x + 20 && mouseY > shape.y - 50 && mouseY < shape.y + 10) {
                    handleDragStart(event as any, 'shape', index, mouseX - shape.x, mouseY - shape.y);
                }
            }
        });

        texts.forEach((text, index) => {
            if (mouseX > text.x - 20 && mouseX < text.x + 100 && mouseY > text.y - 20 && mouseY < text.y + 10) {
                handleDragStart(event as any, 'text', index, mouseX - text.x, mouseY - text.y);
            }
        });
    };

    // Maneja el movimiento del ratón para actualizar la posición de los elementos arrastrados
    const handleMouseMove = (event: React.MouseEvent) => {
        if (draggingItem) {
            const rect = canvasRef.current?.getBoundingClientRect();
            const mouseX = event.clientX - (rect ? rect.left : 0);
            const mouseY = event.clientY - (rect ? rect.top : 0);

            if (draggingItem.type === 'shape') {
                const newShapes = [...shapes];
                newShapes[draggingItem.index] = {
                    ...newShapes[draggingItem.index],
                    x: mouseX - draggingItem.offsetX,
                    y: mouseY - draggingItem.offsetY,
                };
                setShapes(newShapes);
            } else if (draggingItem.type === 'text') {
                const newTexts = [...texts];
                newTexts[draggingItem.index] = {
                    ...newTexts[draggingItem.index],
                    x: mouseX - draggingItem.offsetX,
                    y: mouseY - draggingItem.offsetY,
                };
                setTexts(newTexts);
            }
        }
    };

    // Guarda el canvas como imagen
    const saveCanvasAsImage = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const dataUrl = canvas.toDataURL('image/png'); // Convierte el canvas a un formato de imagen
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'caso_de_uso.png'; // Nombre del archivo
            link.click(); // Inicia la descarga
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Ilustrar Casos de Uso</h1>
            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '20px' }}>
                    <h2>Figuras</h2>
                    {shapesList.map((shape, index) => (
                        <div 
                            key={shape.type} 
                            draggable 
                            onDragStart={(e) => handleDragStart(e, 'shape', index)} 
                            style={{ padding: '10px', border: '1px solid blue', cursor: 'grab', marginBottom: '5px' }}
                        >
                            {shape.label}
                        </div>
                    ))}
                    <h2>Texto</h2>
                    <input 
                        type="text" 
                        value={currentText} 
                        onChange={(e) => setCurrentText(e.target.value)} 
                        placeholder="Escribe tu texto aquí" 
                        style={{ marginTop: '10px' }}
                    />
                    <button onClick={handleTextSubmit}>Agregar Texto</button>
                </div>
                <canvas 
                    ref={canvasRef} 
                    width={800} 
                    height={600} 
                    style={{ border: '1px solid black' }} 
                    onDrop={handleDrop} 
                    onDragOver={handleDragOver} 
                    onMouseDown={handleMouseDown} 
                    onMouseMove={handleMouseMove} 
                />
            </div>
            {texts.map((text, index) => (
                <div 
                    key={index} 
                    draggable 
                    onDragStart={(e) => handleDragStart(e, 'text', index)} 
                    style={{ margin: '5px', cursor: 'grab' }}
                >
                    {text.text}
                </div>
            ))}
            <button onClick={saveCanvasAsImage} style={{ marginTop: '20px', padding: '10px', backgroundColor: 'red', color: 'white', border: 'dotted', cursor: 'pointer' }}>
                Guardar Caso
            </button>
        
        </div>
    );
};

export default Canvas;
