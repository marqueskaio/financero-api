import {ok, serverError} from "../../../helpers/http/http-helper";
import {HttpRequest} from "../../../interfaces/http/http-request";
import {HttpResponse} from "../../../interfaces/http/http-response";
import {UsecaseInterface} from "../../../interfaces/usecases/usecase-interface";
import {Controller} from "../../../interfaces/controllers/Controller";

export class CreateExpensesController implements Controller {
    constructor(private readonly createExpensesUsecase: UsecaseInterface) {}

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const expense = await this.createExpensesUsecase.execute(request.body)
            return ok(expense)
        } catch (error: any) {
            return serverError(error)
        }
    }
}
