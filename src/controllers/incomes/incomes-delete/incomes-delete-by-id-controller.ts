import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {Controller} from "../../../interfaces/controllers/Controller";
import {HttpRequest} from "../../../interfaces/http/http-request";
import {HttpResponse} from "../../../interfaces/http/http-response";
import {ok, serverError} from "../../../helpers/http/http-helper";

export class IncomesDeleteByIdController implements Controller {
    constructor(private readonly deleteIncomesByIdUseCase: UsecaseInterface) {}


    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const income = await this.deleteIncomesByIdUseCase.execute(request.params.id)
        return ok(income)
        } catch (error: any) {
        return serverError(error)
        }
    }
}
