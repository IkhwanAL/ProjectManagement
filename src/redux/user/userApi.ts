import { DataUser } from "../../Props/User.property";
import user from "../../_mock/_user.json";

export function getUserApi(username: string) {
	return new Promise<{ data: DataUser }>((resolve) => {
		const filterUser = user.filter((x, y) => x.username === username);
		setTimeout(
			() =>
				resolve({
					data: filterUser[0],
				}),
			500
		);
	});
}
