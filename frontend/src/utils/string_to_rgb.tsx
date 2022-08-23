function hashCode(str: string)
{
	let hash = 0;
	for (var i = 0; i < str.length; i++)
	{
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return hash;
}

function intToHex(i: number)
{
	const c = (i & 0x00FFFFFF)
		.toString(16)
		.toUpperCase();

	function hexToRgb(hex)
	{
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}

	return "00000".substring(0, 6 - c.length) + c;
}

function strToHex(str: string)
{
	return ("#" + intToRGB(hashCode(str)));
}

export default strToHex;
