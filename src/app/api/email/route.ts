import {NextResponse} from "next/server";
import {mailOptions, transporter} from "@/shared/config";

export async function POST(req: Request) {
	const body = await req.json();
	if (body.type === "POST_COMMENT") {
		try {
			await transporter.sendMail({
				...mailOptions,
				subject: "Новый отзыв",
				text: "На сайт добавлен новый отзыв",
				html: "<h1>На сайт добавлен новый отзыв</h1>" +
					`<p>От: ${body.data.Name}</p>` +
					`<p>Текст: ${body.data.Text}</p>` +
					`<p>Оценка: ${body.data.Raiting === "Like" ? "Положительно" : "Отрицательно"}</p>` +
					"<p style='color: green;'>Для добавления его на сайт - пройдите в раздел 'Отзывы' административной панели и измените статус на 'Опубликован'!</p>"
			});
			return NextResponse.json({success: true})
		} catch (e) {
			console.log(e);
			return NextResponse.error();
		}
	} else if (body.type === "POST_RESUME") {
		try {
			await transporter.sendMail({
				...mailOptions,
				subject: "Новое резюме",
				text: "На сайт добавлено новое резюме",
				html: "<h1>На сайт добавлено новое резюме</h1>" +
					`<p>От: ${body.data.Name}</p>` +
					`<p>Номер телефона: ${body.data.Phone}</p>` +
					"<p style='color: green;'>Для просмотра текста резюме - пройдите в раздел 'Резюме' административной панели!</p>"
			});
			return NextResponse.json({success: true})
		} catch (e) {
			console.log(e);
			return NextResponse.error();
		}
	} else if (body.type === "POST_CALLBACK") {
		try {
			await transporter.sendMail({
				...mailOptions,
				subject: "Заявка на обратный звонок",
				text: "Новая заявка на обратный звоное",
				html: "<h1>С сайта поступила новая заявка на обратный звонок</h1>" +
					`<p>Имя: ${body.data.Name}</p>` +
					`<p>Номер телефона: ${body.data.Phone}</p>` +
					"<p style='color: green;'>Перезвоните в кратчайшее время!</p>"
			});
			return NextResponse.json({success: true})
		} catch (e) {
			console.log(e);
			return NextResponse.error();
		}
	}
}

