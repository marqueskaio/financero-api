import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {HttpResponse} from "../../../interfaces/http/http-response";
import {HttpRequest} from "../../../interfaces/http/http-request";
import {Controller} from "../../../interfaces/controllers/Controller";
import {ok, serverError} from "../../../helpers/http/http-helper";

export class CreateIncomesController implements Controller {
    constructor(private readonly createIncomesUsecase: UsecaseInterface) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const {data, description, category} = request.body
            const value = Number(request.body.value)
            const income = await this.createIncomesUsecase.execute({data, value, description, category})
            return ok(income)
        } catch (error: any) {
            return serverError(error)
        }
    }
}
