import { PrismaClient } from '@prisma/client';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import { Writable } from 'stream';

const prisma = new PrismaClient();

export async function POST(req) {
    const { tipo, formato, fechaInicio, fechaFin, campos } = await req.json();

    let data;
    try {
        // Extrae los datos según el tipo de informe
        if (tipo === 'diagnostics') {
            data = await prisma.diagnosis.findMany({
                where: {
                    createdAt: {
                        gte: new Date(fechaInicio),
                        lte: new Date(fechaFin),
                    },
                },
                include: {
                    user: true,
                    tests: true,
                },
            });
        } else if (tipo === 'users') {
            data = await prisma.user.findMany({
                where: {
                    createdAt: {
                        gte: new Date(fechaInicio),
                        lte: new Date(fechaFin),
                    },
                },
            });
        } else if (tipo === 'companies') {
            data = await prisma.test.findMany({
                where: {
                    createdAt: {
                        gte: new Date(fechaInicio),
                        lte: new Date(fechaFin),
                    },
                },
                include: {
                    diagnosis: true,
                },
            });
        } else if (tipo === 'pruebas') {
            // Este informe podría requerir lógica adicional para agregar tendencias
            data = await prisma.empresa.groupBy({
                by: ['sector'],
                _count: true,
            });
        } else {
            return new Response(JSON.stringify({ message: 'Tipo de informe no soportado' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (formato === 'excel') {
            // Generar el informe en Excel
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Informe');

            // Agregar encabezados de columnas basados en los campos seleccionados
            worksheet.columns = campos.map(campo => ({ header: campo, key: campo }));

            // Agregar filas de datos
            data.forEach(item => {
                const row = campos.reduce((acc, campo) => {
                    acc[campo] = item[campo];
                    return acc;
                }, {});
                worksheet.addRow(row);
            });

            const buffer = await workbook.xlsx.writeBuffer();

            return new Response(buffer, {
                status: 200,
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': `attachment; filename=${tipo}.xlsx`,
                },
            });
        } else if (formato === 'pdf') {
            // Generar el informe en PDF
            const doc = new PDFDocument();
            const chunks = [];

            const stream = new Writable({
                write(chunk, encoding, callback) {
                    chunks.push(chunk);
                    callback();
                },
            });

            doc.pipe(stream);

            // Agregar contenido al PDF
            doc.fontSize(16).text('Informe', { align: 'center' });
            data.forEach(item => {
                doc.moveDown().fontSize(12).text(JSON.stringify(item), { align: 'left' });
            });

            doc.end();

            await new Promise((resolve) => stream.on('finish', resolve));

            const pdfBuffer = Buffer.concat(chunks);

            return new Response(pdfBuffer, {
                status: 200,
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename=${tipo}.pdf`,
                },
            });
        } else {
            return new Response(JSON.stringify({ message: 'Formato no soportado' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error('Error al generar el informe:', error);
        return new Response(JSON.stringify({ message: 'Error al generar el informe' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
