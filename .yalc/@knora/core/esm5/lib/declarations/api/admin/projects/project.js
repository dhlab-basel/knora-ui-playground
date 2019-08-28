import * as tslib_1 from "tslib";
import { JsonObject, JsonProperty } from 'json2typescript';
import { StringLiteral } from '../../shared/strings';
var Project = /** @class */ (function () {
    function Project() {
        this.id = undefined;
        this.shortname = undefined;
        this.shortcode = undefined;
        this.longname = undefined;
        this.description = [new StringLiteral()];
        this.keywords = undefined;
        this.logo = undefined;
        this.institution = undefined;
        this.ontologies = undefined;
        this.status = undefined;
        this.selfjoin = undefined;
    }
    tslib_1.__decorate([
        JsonProperty('id', String),
        tslib_1.__metadata("design:type", String)
    ], Project.prototype, "id", void 0);
    tslib_1.__decorate([
        JsonProperty('shortname', String),
        tslib_1.__metadata("design:type", String)
    ], Project.prototype, "shortname", void 0);
    tslib_1.__decorate([
        JsonProperty('shortcode', String, true),
        tslib_1.__metadata("design:type", String)
    ], Project.prototype, "shortcode", void 0);
    tslib_1.__decorate([
        JsonProperty('longname', String, true),
        tslib_1.__metadata("design:type", String)
    ], Project.prototype, "longname", void 0);
    tslib_1.__decorate([
        JsonProperty('description', [StringLiteral], true),
        tslib_1.__metadata("design:type", Array)
    ], Project.prototype, "description", void 0);
    tslib_1.__decorate([
        JsonProperty('keywords', [String], true),
        tslib_1.__metadata("design:type", Array)
    ], Project.prototype, "keywords", void 0);
    tslib_1.__decorate([
        JsonProperty('logo', String, true),
        tslib_1.__metadata("design:type", String)
    ], Project.prototype, "logo", void 0);
    tslib_1.__decorate([
        JsonProperty('institution', String, true),
        tslib_1.__metadata("design:type", String)
    ], Project.prototype, "institution", void 0);
    tslib_1.__decorate([
        JsonProperty('ontologies', [String]),
        tslib_1.__metadata("design:type", Array)
    ], Project.prototype, "ontologies", void 0);
    tslib_1.__decorate([
        JsonProperty('status', Boolean),
        tslib_1.__metadata("design:type", Boolean)
    ], Project.prototype, "status", void 0);
    tslib_1.__decorate([
        JsonProperty('selfjoin', Boolean),
        tslib_1.__metadata("design:type", Boolean)
    ], Project.prototype, "selfjoin", void 0);
    Project = tslib_1.__decorate([
        JsonObject('Project')
    ], Project);
    return Project;
}());
export { Project };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9jb3JlLyIsInNvdXJjZXMiOlsibGliL2RlY2xhcmF0aW9ucy9hcGkvYWRtaW4vcHJvamVjdHMvcHJvamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJckQ7SUFEQTtRQUlXLE9BQUUsR0FBVyxTQUFTLENBQUM7UUFHdkIsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUc5QixjQUFTLEdBQVcsU0FBUyxDQUFDO1FBRzlCLGFBQVEsR0FBVyxTQUFTLENBQUM7UUFHN0IsZ0JBQVcsR0FBb0IsQ0FBQyxJQUFJLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFHckQsYUFBUSxHQUFhLFNBQVMsQ0FBQztRQUcvQixTQUFJLEdBQVcsU0FBUyxDQUFDO1FBR3pCLGdCQUFXLEdBQVcsU0FBUyxDQUFDO1FBR2hDLGVBQVUsR0FBYSxTQUFTLENBQUM7UUFHakMsV0FBTSxHQUFZLFNBQVMsQ0FBQztRQUc1QixhQUFRLEdBQVksU0FBUyxDQUFDO0lBRXpDLENBQUM7SUFoQ0c7UUFEQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQzs7dUNBQ0c7SUFHOUI7UUFEQyxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQzs7OENBQ0c7SUFHckM7UUFEQyxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7OzhDQUNIO0lBR3JDO1FBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOzs2Q0FDSDtJQUdwQztRQURDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRSxJQUFJLENBQUM7O2dEQUNTO0lBRzVEO1FBREMsWUFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQzs7NkNBQ0g7SUFHdEM7UUFEQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7O3lDQUNIO0lBR2hDO1FBREMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDOztnREFDSDtJQUd2QztRQURDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7K0NBQ0c7SUFHeEM7UUFEQyxZQUFZLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQzs7MkNBQ0c7SUFHbkM7UUFEQyxZQUFZLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQzs7NkNBQ0c7SUFqQzVCLE9BQU87UUFEbkIsVUFBVSxDQUFDLFNBQVMsQ0FBQztPQUNULE9BQU8sQ0FtQ25CO0lBQUQsY0FBQztDQUFBLEFBbkNELElBbUNDO1NBbkNZLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tICdqc29uMnR5cGVzY3JpcHQnO1xuaW1wb3J0IHsgU3RyaW5nTGl0ZXJhbCB9IGZyb20gJy4uLy4uL3NoYXJlZC9zdHJpbmdzJztcblxuXG5ASnNvbk9iamVjdCgnUHJvamVjdCcpXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XG5cbiAgICBASnNvblByb3BlcnR5KCdpZCcsIFN0cmluZylcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3Nob3J0bmFtZScsIFN0cmluZylcbiAgICBwdWJsaWMgc2hvcnRuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdzaG9ydGNvZGUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIHNob3J0Y29kZTogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnbG9uZ25hbWUnLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxvbmduYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICBASnNvblByb3BlcnR5KCdkZXNjcmlwdGlvbicsIFtTdHJpbmdMaXRlcmFsXSwgdHJ1ZSlcbiAgICBwdWJsaWMgZGVzY3JpcHRpb246IFN0cmluZ0xpdGVyYWxbXSA9IFtuZXcgU3RyaW5nTGl0ZXJhbCgpXTtcblxuICAgIEBKc29uUHJvcGVydHkoJ2tleXdvcmRzJywgW1N0cmluZ10sIHRydWUpXG4gICAgcHVibGljIGtleXdvcmRzOiBzdHJpbmdbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2xvZ28nLCBTdHJpbmcsIHRydWUpXG4gICAgcHVibGljIGxvZ286IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ2luc3RpdHV0aW9uJywgU3RyaW5nLCB0cnVlKVxuICAgIHB1YmxpYyBpbnN0aXR1dGlvbjogc3RyaW5nID0gdW5kZWZpbmVkO1xuXG4gICAgQEpzb25Qcm9wZXJ0eSgnb250b2xvZ2llcycsIFtTdHJpbmddKVxuICAgIHB1YmxpYyBvbnRvbG9naWVzOiBzdHJpbmdbXSA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3N0YXR1cycsIEJvb2xlYW4pXG4gICAgcHVibGljIHN0YXR1czogYm9vbGVhbiA9IHVuZGVmaW5lZDtcblxuICAgIEBKc29uUHJvcGVydHkoJ3NlbGZqb2luJywgQm9vbGVhbilcbiAgICBwdWJsaWMgc2VsZmpvaW46IGJvb2xlYW4gPSB1bmRlZmluZWQ7XG5cbn1cbiJdfQ==