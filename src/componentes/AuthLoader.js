import { controleBD } from "../controleSupabase";

export default async function AuthLoader() {

    const { data: sessionData, error: sessionError } = await controleBD.auth.getSession();
    if (sessionError)
        return;
    else {
        if (!sessionData.session.user) {
            return;
        } else {
            const { data: resultado, status } = await controleBD.from("funcionario").select("eGerente").eq("id", sessionData.session.user.id);

            return {
                user: { ...sessionData.session.user, eGerente: (status === 200 && resultado[0].eGerente) },
                session: { ...sessionData.session }
            };
        };
    }
}