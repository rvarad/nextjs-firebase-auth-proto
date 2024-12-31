import { cookies } from "next/headers"
import { firebaseAdminAuth } from "./adminAppConfig"

async function createSessionCookie(idToken, sessionCookieOptions) {
	try {
		const verifiedToken = await firebaseAdminAuth.verifyIdToken(idToken)
		if (verifiedToken) {
			return firebaseAdminAuth.createSessionCookie(
				idToken,
				sessionCookieOptions
			)
		}
	} catch (error) {
		console.error("Error creating session cookie", error)
		return error
	}
}

async function getSession() {
	try {
		return (await cookies()).get("session").value
	} catch (error) {
		console.error("Error getting session cookie", error)
		return error
	}
}

async function revokeSession(sessionCookie) {
	try {
		const verifiedToken = await firebaseAdminAuth.verifySessionCookie(
			sessionCookie
		)

		return firebaseAdminAuth.revokeRefreshTokens(verifiedToken.uid)
	} catch (error) {
		console.error("Error revoking session cookie", error)
		return error
	}
}

export { createSessionCookie, getSession, revokeSession }