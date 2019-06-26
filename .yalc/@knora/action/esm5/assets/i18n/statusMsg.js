import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var StatusMsg = /** @class */ (function () {
    function StatusMsg() {
        this.default = {
            '100': {
                'message': 'Continue',
                'description': 'The server has received the request headers, and the client should proceed to send the request body'
            },
            '101': {
                'message': 'Switching Protocols',
                'description': 'The requester has asked the server to switch protocols'
            },
            '103': {
                'message': 'Checkpoint',
                'description': 'Used in the resumable requests proposal to resume aborted PUT or POST requests'
            },
            '200': {
                'message': 'OK',
                'description': 'The request is OK (this is the standard response for successful HTTP requests)'
            },
            '201': {
                'message': 'Created',
                'description': 'The request has been fulfilled, and a new resource is created'
            },
            '202': {
                'message': 'Accepted',
                'description': 'The request has been accepted for processing, but the processing has not been completed'
            },
            '203': {
                'message': 'Non-Authoritative Information',
                'description': 'The request has been successfully processed, but is returning information that may be from another source'
            },
            '204': {
                'message': 'No Content',
                'description': 'The request has been successfully processed, but is not returning any content'
            },
            '205': {
                'message': 'Reset Content',
                'description': 'The request has been successfully processed, but is not returning any content, and requires that the requester reset the document view'
            },
            '206': {
                'message': 'Partial Content',
                'description': 'The server is delivering only part of the resource due to a range header sent by the client'
            },
            '300': {
                'message': 'Multiple Choices',
                'description': 'A link list. The user can select a link and go to that location. Maximum five addresses'
            },
            '301': {
                'message': 'Moved Permanently',
                'description': 'The requested page has moved to a new URL'
            },
            '302': {
                'message': 'Found',
                'description': 'The requested page has moved temporarily to a new URL'
            },
            '303': {
                'message': 'See Other',
                'description': 'The requested page can be found under a different URL'
            },
            '304': {
                'message': 'Not Modified',
                'description': 'Indicates the requested page has not been modified since last requested'
            },
            '306': {
                'message': 'Switch Proxy',
                'description': '-- No longer used --'
            },
            '307': {
                'message': 'Temporary Redirect',
                'description': 'The requested page has moved temporarily to a new URL'
            },
            '308': {
                'message': 'Resume Incomplete',
                'description': 'Used in the resumable requests proposal to resume aborted PUT or POST requests'
            },
            '400': {
                'message': 'Bad Request',
                'description': 'The request cannot be fulfilled due to bad syntax'
            },
            '401': {
                'message': 'Unauthorized',
                'description': 'The request was a legal request, but the server is refusing to respond to it. For use when authentication is possible but has failed or not yet been provided'
            },
            '402': {
                'message': 'Payment Required',
                'description': '-- Reserved for future use --'
            },
            '403': {
                'message': 'Forbidden',
                'description': 'The request was a legal request, but the server is refusing to respond to it'
            },
            '404': {
                'message': 'Not Found',
                'description': 'The requested page could not be found but may be available again in the future'
            },
            '405': {
                'message': 'Method Not Allowed',
                'description': 'A request was made of a page using a request method not supported by that page'
            },
            '406': {
                'message': 'Not Acceptable',
                'description': 'The server can only generate a response that is not accepted by the client'
            },
            '407': {
                'message': 'Proxy Authentication Required',
                'description': 'The client must first authenticate itself with the proxy'
            },
            '408': {
                'message': 'Request Timeout',
                'description': 'The server timed out waiting for the request'
            },
            '409': {
                'message': 'Conflict',
                'description': 'The request could not be completed because of a conflict in the request'
            },
            '410': {
                'message': 'Gone',
                'description': 'The requested page is no longer available'
            },
            '411': {
                'message': 'Length Required',
                'description': 'The "Content-Length" is not defined. The server will not accept the request without it'
            },
            '412': {
                'message': 'Precondition Failed',
                'description': 'The precondition given in the request evaluated to false by the server'
            },
            '413': {
                'message': 'Request Entity Too Large',
                'description': 'The server will not accept the request, because the request entity is too large'
            },
            '414': {
                'message': 'Request-URI Too Long',
                'description': 'The server will not accept the request, because the URL is too long. Occurs when you convert a POST request to a GET request with a long query information'
            },
            '415': {
                'message': 'Unsupported Media Type',
                'description': 'The server will not accept the request, because the media type is not supported'
            },
            '416': {
                'message': 'Requested Range Not Satisfiable',
                'description': 'The client has asked for a portion of the file, but the server cannot supply that portion'
            },
            '417': {
                'message': 'Expectation Failed',
                'description': 'The server cannot meet the requirements of the Expect request-header field'
            },
            '418': {
                'message': 'I\'m a teapot',
                'description': 'Any attempt to brew coffee with a teapot should result in the error code "418 I\'m a teapot". The resulting entity body MAY be short and stout'
            },
            '421': {
                'message': 'Misdirected Request',
                'description': 'The request was directed at a server that is not able to produce a response (for example because a connection reuse)'
            },
            '422': {
                'message': 'Unprocessable Entity',
                'description': 'The request was well-formed but was unable to be followed due to semantic errors'
            },
            '423': {
                'message': 'Locked',
                'description': 'The resource that is being accessed is locked'
            },
            '424': {
                'message': 'Failed Dependency',
                'description': 'The request failed due to failure of a previous request (e.g., a PROPPATCH)'
            },
            '426': {
                'message': 'Upgrade Required',
                'description': 'The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field'
            },
            '428': {
                'message': 'Precondition Required',
                'description': 'The origin server requires the request to be conditional'
            },
            '429': {
                'message': 'Too Many Requests',
                'description': 'The user has sent too many requests in a given amount of time. Intended for use with rate limiting schemes'
            },
            '431': {
                'message': 'Request Header Fields Too Large',
                'description': 'The server is unwilling to process the request because either an individual header field, or all the header fields collectively, are too large'
            },
            '451': {
                'message': 'Unavailable For Legal Reasons',
                'description': 'A server operator has received a legal demand to deny access to a resource or to a set of resources that includes the requested resource'
            },
            '500': {
                'message': 'Internal Server Error',
                'description': 'An error has occured in a server side script, a no more specific message is suitable'
            },
            '501': {
                'message': 'Not Implemented',
                'description': 'The server either does not recognize the request method, or it lacks the ability to fulfill the request'
            },
            '502': {
                'message': 'Bad Gateway',
                'description': 'The server was acting as a gateway or proxy and received an invalid response from the upstream server'
            },
            '503': {
                'message': 'Service Unavailable',
                'description': 'The server is currently unavailable (overloaded or down)'
            },
            '504': {
                'message': 'Gateway Timeout',
                'description': 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server'
            },
            '505': {
                'message': 'HTTP Version Not Supported',
                'description': 'The server does not support the HTTP protocol version used in the request'
            },
            '511': {
                'message': 'Network Authentication Required',
                'description': 'The client needs to authenticate to gain network access'
            },
            'info': {
                'lastUpdate': {
                    'date': '20160411',
                    'log': '4xx Codes updated via Wikipedia'
                },
                'references': {
                    'W3Schools': 'http://www.w3schools.com/tags/ref_httpmessages.asp',
                    'Wikipedia': 'https://en.wikipedia.org/wiki/List_of_HTTP_status_codes'
                },
                'codeLookup': {
                    'info': 'Use the \'code\' variable in the url to lookup and individual code',
                    'demoURL': '/statusMsg/?code=500'
                },
                'htmlDisplay': {
                    'info': 'Add the \'html\' variable to your code lookup to get the error displayed in a nice html template',
                    'demoURL': '/statusMsg/?code=404&html'
                },
                'invalidCode': 'If an invalid code is given, the site will just show the json list of all codes',
                'credits': 'This site was crafted by Unreal Designs and is powered by UDCDN'
            },
            '1xx': {
                'message': 'Information',
                'description': ''
            },
            '2xx': {
                'message': 'Successful',
                'description': ''
            },
            '3xx': {
                'message': 'Redirection',
                'description': ''
            },
            '4xx': {
                'message': 'Client Error',
                'description': ''
            },
            '5xx': {
                'message': 'Server Error',
                'description': ''
            }
        };
    }
    StatusMsg.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    StatusMsg.ngInjectableDef = i0.defineInjectable({ factory: function StatusMsg_Factory() { return new StatusMsg(); }, token: StatusMsg, providedIn: "root" });
    return StatusMsg;
}());
export { StatusMsg };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzTXNnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2FjdGlvbi8iLCJzb3VyY2VzIjpbImFzc2V0cy9pMThuL3N0YXR1c01zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQztJQUFBO1FBS0ksWUFBTyxHQUFRO1lBQ1gsS0FBSyxFQUFFO2dCQUNILFNBQVMsRUFBRSxVQUFVO2dCQUNyQixhQUFhLEVBQUUscUdBQXFHO2FBQ3ZIO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFNBQVMsRUFBRSxxQkFBcUI7Z0JBQ2hDLGFBQWEsRUFBRSx3REFBd0Q7YUFDMUU7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsU0FBUyxFQUFFLFlBQVk7Z0JBQ3ZCLGFBQWEsRUFBRSxnRkFBZ0Y7YUFDbEc7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsYUFBYSxFQUFFLGdGQUFnRjthQUNsRztZQUNELEtBQUssRUFBRTtnQkFDSCxTQUFTLEVBQUUsU0FBUztnQkFDcEIsYUFBYSxFQUFFLCtEQUErRDthQUNqRjtZQUNELEtBQUssRUFBRTtnQkFDSCxTQUFTLEVBQUUsVUFBVTtnQkFDckIsYUFBYSxFQUFFLHlGQUF5RjthQUMzRztZQUNELEtBQUssRUFBRTtnQkFDSCxTQUFTLEVBQUUsK0JBQStCO2dCQUMxQyxhQUFhLEVBQUUsMkdBQTJHO2FBQzdIO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFNBQVMsRUFBRSxZQUFZO2dCQUN2QixhQUFhLEVBQUUsK0VBQStFO2FBQ2pHO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFNBQVMsRUFBRSxlQUFlO2dCQUMxQixhQUFhLEVBQUUsd0lBQXdJO2FBQzFKO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFNBQVMsRUFBRSxpQkFBaUI7Z0JBQzVCLGFBQWEsRUFBRSw2RkFBNkY7YUFDL0c7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsU0FBUyxFQUFFLGtCQUFr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UUMsQUFwUUQsSUFvUUM7U0FqUVksU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBTdGF0dXNNc2cge1xuXG4gICAgZGVmYXVsdDogYW55ID0ge1xuICAgICAgICAnMTAwJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnQ29udGludWUnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBzZXJ2ZXIgaGFzIHJlY2VpdmVkIHRoZSByZXF1ZXN0IGhlYWRlcnMsIGFuZCB0aGUgY2xpZW50IHNob3VsZCBwcm9jZWVkIHRvIHNlbmQgdGhlIHJlcXVlc3QgYm9keSdcbiAgICAgICAgfSxcbiAgICAgICAgJzEwMSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1N3aXRjaGluZyBQcm90b2NvbHMnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0ZXIgaGFzIGFza2VkIHRoZSBzZXJ2ZXIgdG8gc3dpdGNoIHByb3RvY29scydcbiAgICAgICAgfSxcbiAgICAgICAgJzEwMyc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0NoZWNrcG9pbnQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1VzZWQgaW4gdGhlIHJlc3VtYWJsZSByZXF1ZXN0cyBwcm9wb3NhbCB0byByZXN1bWUgYWJvcnRlZCBQVVQgb3IgUE9TVCByZXF1ZXN0cydcbiAgICAgICAgfSxcbiAgICAgICAgJzIwMCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ09LJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgcmVxdWVzdCBpcyBPSyAodGhpcyBpcyB0aGUgc3RhbmRhcmQgcmVzcG9uc2UgZm9yIHN1Y2Nlc3NmdWwgSFRUUCByZXF1ZXN0cyknXG4gICAgICAgIH0sXG4gICAgICAgICcyMDEnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdDcmVhdGVkJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgcmVxdWVzdCBoYXMgYmVlbiBmdWxmaWxsZWQsIGFuZCBhIG5ldyByZXNvdXJjZSBpcyBjcmVhdGVkJ1xuICAgICAgICB9LFxuICAgICAgICAnMjAyJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnQWNjZXB0ZWQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0IGhhcyBiZWVuIGFjY2VwdGVkIGZvciBwcm9jZXNzaW5nLCBidXQgdGhlIHByb2Nlc3NpbmcgaGFzIG5vdCBiZWVuIGNvbXBsZXRlZCdcbiAgICAgICAgfSxcbiAgICAgICAgJzIwMyc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ05vbi1BdXRob3JpdGF0aXZlIEluZm9ybWF0aW9uJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgcmVxdWVzdCBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgcHJvY2Vzc2VkLCBidXQgaXMgcmV0dXJuaW5nIGluZm9ybWF0aW9uIHRoYXQgbWF5IGJlIGZyb20gYW5vdGhlciBzb3VyY2UnXG4gICAgICAgIH0sXG4gICAgICAgICcyMDQnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdObyBDb250ZW50JyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgcmVxdWVzdCBoYXMgYmVlbiBzdWNjZXNzZnVsbHkgcHJvY2Vzc2VkLCBidXQgaXMgbm90IHJldHVybmluZyBhbnkgY29udGVudCdcbiAgICAgICAgfSxcbiAgICAgICAgJzIwNSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1Jlc2V0IENvbnRlbnQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0IGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBwcm9jZXNzZWQsIGJ1dCBpcyBub3QgcmV0dXJuaW5nIGFueSBjb250ZW50LCBhbmQgcmVxdWlyZXMgdGhhdCB0aGUgcmVxdWVzdGVyIHJlc2V0IHRoZSBkb2N1bWVudCB2aWV3J1xuICAgICAgICB9LFxuICAgICAgICAnMjA2Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnUGFydGlhbCBDb250ZW50JyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc2VydmVyIGlzIGRlbGl2ZXJpbmcgb25seSBwYXJ0IG9mIHRoZSByZXNvdXJjZSBkdWUgdG8gYSByYW5nZSBoZWFkZXIgc2VudCBieSB0aGUgY2xpZW50J1xuICAgICAgICB9LFxuICAgICAgICAnMzAwJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnTXVsdGlwbGUgQ2hvaWNlcycsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnQSBsaW5rIGxpc3QuIFRoZSB1c2VyIGNhbiBzZWxlY3QgYSBsaW5rIGFuZCBnbyB0byB0aGF0IGxvY2F0aW9uLiBNYXhpbXVtIGZpdmUgYWRkcmVzc2VzJ1xuICAgICAgICB9LFxuICAgICAgICAnMzAxJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnTW92ZWQgUGVybWFuZW50bHknLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0ZWQgcGFnZSBoYXMgbW92ZWQgdG8gYSBuZXcgVVJMJ1xuICAgICAgICB9LFxuICAgICAgICAnMzAyJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnRm91bmQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0ZWQgcGFnZSBoYXMgbW92ZWQgdGVtcG9yYXJpbHkgdG8gYSBuZXcgVVJMJ1xuICAgICAgICB9LFxuICAgICAgICAnMzAzJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnU2VlIE90aGVyJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgcmVxdWVzdGVkIHBhZ2UgY2FuIGJlIGZvdW5kIHVuZGVyIGEgZGlmZmVyZW50IFVSTCdcbiAgICAgICAgfSxcbiAgICAgICAgJzMwNCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ05vdCBNb2RpZmllZCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnSW5kaWNhdGVzIHRoZSByZXF1ZXN0ZWQgcGFnZSBoYXMgbm90IGJlZW4gbW9kaWZpZWQgc2luY2UgbGFzdCByZXF1ZXN0ZWQnXG4gICAgICAgIH0sXG4gICAgICAgICczMDYnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdTd2l0Y2ggUHJveHknLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJy0tIE5vIGxvbmdlciB1c2VkIC0tJ1xuICAgICAgICB9LFxuICAgICAgICAnMzA3Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnVGVtcG9yYXJ5IFJlZGlyZWN0JyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgcmVxdWVzdGVkIHBhZ2UgaGFzIG1vdmVkIHRlbXBvcmFyaWx5IHRvIGEgbmV3IFVSTCdcbiAgICAgICAgfSxcbiAgICAgICAgJzMwOCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1Jlc3VtZSBJbmNvbXBsZXRlJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdVc2VkIGluIHRoZSByZXN1bWFibGUgcmVxdWVzdHMgcHJvcG9zYWwgdG8gcmVzdW1lIGFib3J0ZWQgUFVUIG9yIFBPU1QgcmVxdWVzdHMnXG4gICAgICAgIH0sXG4gICAgICAgICc0MDAnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdCYWQgUmVxdWVzdCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHJlcXVlc3QgY2Fubm90IGJlIGZ1bGZpbGxlZCBkdWUgdG8gYmFkIHN5bnRheCdcbiAgICAgICAgfSxcbiAgICAgICAgJzQwMSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1VuYXV0aG9yaXplZCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHJlcXVlc3Qgd2FzIGEgbGVnYWwgcmVxdWVzdCwgYnV0IHRoZSBzZXJ2ZXIgaXMgcmVmdXNpbmcgdG8gcmVzcG9uZCB0byBpdC4gRm9yIHVzZSB3aGVuIGF1dGhlbnRpY2F0aW9uIGlzIHBvc3NpYmxlIGJ1dCBoYXMgZmFpbGVkIG9yIG5vdCB5ZXQgYmVlbiBwcm92aWRlZCdcbiAgICAgICAgfSxcbiAgICAgICAgJzQwMic6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1BheW1lbnQgUmVxdWlyZWQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJy0tIFJlc2VydmVkIGZvciBmdXR1cmUgdXNlIC0tJ1xuICAgICAgICB9LFxuICAgICAgICAnNDAzJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnRm9yYmlkZGVuJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgcmVxdWVzdCB3YXMgYSBsZWdhbCByZXF1ZXN0LCBidXQgdGhlIHNlcnZlciBpcyByZWZ1c2luZyB0byByZXNwb25kIHRvIGl0J1xuICAgICAgICB9LFxuICAgICAgICAnNDA0Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnTm90IEZvdW5kJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgcmVxdWVzdGVkIHBhZ2UgY291bGQgbm90IGJlIGZvdW5kIGJ1dCBtYXkgYmUgYXZhaWxhYmxlIGFnYWluIGluIHRoZSBmdXR1cmUnXG4gICAgICAgIH0sXG4gICAgICAgICc0MDUnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdNZXRob2QgTm90IEFsbG93ZWQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0EgcmVxdWVzdCB3YXMgbWFkZSBvZiBhIHBhZ2UgdXNpbmcgYSByZXF1ZXN0IG1ldGhvZCBub3Qgc3VwcG9ydGVkIGJ5IHRoYXQgcGFnZSdcbiAgICAgICAgfSxcbiAgICAgICAgJzQwNic6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ05vdCBBY2NlcHRhYmxlJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc2VydmVyIGNhbiBvbmx5IGdlbmVyYXRlIGEgcmVzcG9uc2UgdGhhdCBpcyBub3QgYWNjZXB0ZWQgYnkgdGhlIGNsaWVudCdcbiAgICAgICAgfSxcbiAgICAgICAgJzQwNyc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1Byb3h5IEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgY2xpZW50IG11c3QgZmlyc3QgYXV0aGVudGljYXRlIGl0c2VsZiB3aXRoIHRoZSBwcm94eSdcbiAgICAgICAgfSxcbiAgICAgICAgJzQwOCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1JlcXVlc3QgVGltZW91dCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHNlcnZlciB0aW1lZCBvdXQgd2FpdGluZyBmb3IgdGhlIHJlcXVlc3QnXG4gICAgICAgIH0sXG4gICAgICAgICc0MDknOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdDb25mbGljdCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHJlcXVlc3QgY291bGQgbm90IGJlIGNvbXBsZXRlZCBiZWNhdXNlIG9mIGEgY29uZmxpY3QgaW4gdGhlIHJlcXVlc3QnXG4gICAgICAgIH0sXG4gICAgICAgICc0MTAnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdHb25lJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgcmVxdWVzdGVkIHBhZ2UgaXMgbm8gbG9uZ2VyIGF2YWlsYWJsZSdcbiAgICAgICAgfSxcbiAgICAgICAgJzQxMSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0xlbmd0aCBSZXF1aXJlZCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIFwiQ29udGVudC1MZW5ndGhcIiBpcyBub3QgZGVmaW5lZC4gVGhlIHNlcnZlciB3aWxsIG5vdCBhY2NlcHQgdGhlIHJlcXVlc3Qgd2l0aG91dCBpdCdcbiAgICAgICAgfSxcbiAgICAgICAgJzQxMic6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1ByZWNvbmRpdGlvbiBGYWlsZWQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBwcmVjb25kaXRpb24gZ2l2ZW4gaW4gdGhlIHJlcXVlc3QgZXZhbHVhdGVkIHRvIGZhbHNlIGJ5IHRoZSBzZXJ2ZXInXG4gICAgICAgIH0sXG4gICAgICAgICc0MTMnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdSZXF1ZXN0IEVudGl0eSBUb28gTGFyZ2UnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBzZXJ2ZXIgd2lsbCBub3QgYWNjZXB0IHRoZSByZXF1ZXN0LCBiZWNhdXNlIHRoZSByZXF1ZXN0IGVudGl0eSBpcyB0b28gbGFyZ2UnXG4gICAgICAgIH0sXG4gICAgICAgICc0MTQnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdSZXF1ZXN0LVVSSSBUb28gTG9uZycsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHNlcnZlciB3aWxsIG5vdCBhY2NlcHQgdGhlIHJlcXVlc3QsIGJlY2F1c2UgdGhlIFVSTCBpcyB0b28gbG9uZy4gT2NjdXJzIHdoZW4geW91IGNvbnZlcnQgYSBQT1NUIHJlcXVlc3QgdG8gYSBHRVQgcmVxdWVzdCB3aXRoIGEgbG9uZyBxdWVyeSBpbmZvcm1hdGlvbidcbiAgICAgICAgfSxcbiAgICAgICAgJzQxNSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1Vuc3VwcG9ydGVkIE1lZGlhIFR5cGUnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBzZXJ2ZXIgd2lsbCBub3QgYWNjZXB0IHRoZSByZXF1ZXN0LCBiZWNhdXNlIHRoZSBtZWRpYSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQnXG4gICAgICAgIH0sXG4gICAgICAgICc0MTYnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdSZXF1ZXN0ZWQgUmFuZ2UgTm90IFNhdGlzZmlhYmxlJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgY2xpZW50IGhhcyBhc2tlZCBmb3IgYSBwb3J0aW9uIG9mIHRoZSBmaWxlLCBidXQgdGhlIHNlcnZlciBjYW5ub3Qgc3VwcGx5IHRoYXQgcG9ydGlvbidcbiAgICAgICAgfSxcbiAgICAgICAgJzQxNyc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0V4cGVjdGF0aW9uIEZhaWxlZCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHNlcnZlciBjYW5ub3QgbWVldCB0aGUgcmVxdWlyZW1lbnRzIG9mIHRoZSBFeHBlY3QgcmVxdWVzdC1oZWFkZXIgZmllbGQnXG4gICAgICAgIH0sXG4gICAgICAgICc0MTgnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdJXFwnbSBhIHRlYXBvdCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnQW55IGF0dGVtcHQgdG8gYnJldyBjb2ZmZWUgd2l0aCBhIHRlYXBvdCBzaG91bGQgcmVzdWx0IGluIHRoZSBlcnJvciBjb2RlIFwiNDE4IElcXCdtIGEgdGVhcG90XCIuIFRoZSByZXN1bHRpbmcgZW50aXR5IGJvZHkgTUFZIGJlIHNob3J0IGFuZCBzdG91dCdcbiAgICAgICAgfSxcbiAgICAgICAgJzQyMSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ01pc2RpcmVjdGVkIFJlcXVlc3QnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0IHdhcyBkaXJlY3RlZCBhdCBhIHNlcnZlciB0aGF0IGlzIG5vdCBhYmxlIHRvIHByb2R1Y2UgYSByZXNwb25zZSAoZm9yIGV4YW1wbGUgYmVjYXVzZSBhIGNvbm5lY3Rpb24gcmV1c2UpJ1xuICAgICAgICB9LFxuICAgICAgICAnNDIyJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnVW5wcm9jZXNzYWJsZSBFbnRpdHknLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0IHdhcyB3ZWxsLWZvcm1lZCBidXQgd2FzIHVuYWJsZSB0byBiZSBmb2xsb3dlZCBkdWUgdG8gc2VtYW50aWMgZXJyb3JzJ1xuICAgICAgICB9LFxuICAgICAgICAnNDIzJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnTG9ja2VkJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgcmVzb3VyY2UgdGhhdCBpcyBiZWluZyBhY2Nlc3NlZCBpcyBsb2NrZWQnXG4gICAgICAgIH0sXG4gICAgICAgICc0MjQnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdGYWlsZWQgRGVwZW5kZW5jeScsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHJlcXVlc3QgZmFpbGVkIGR1ZSB0byBmYWlsdXJlIG9mIGEgcHJldmlvdXMgcmVxdWVzdCAoZS5nLiwgYSBQUk9QUEFUQ0gpJ1xuICAgICAgICB9LFxuICAgICAgICAnNDI2Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnVXBncmFkZSBSZXF1aXJlZCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIGNsaWVudCBzaG91bGQgc3dpdGNoIHRvIGEgZGlmZmVyZW50IHByb3RvY29sIHN1Y2ggYXMgVExTLzEuMCwgZ2l2ZW4gaW4gdGhlIFVwZ3JhZGUgaGVhZGVyIGZpZWxkJ1xuICAgICAgICB9LFxuICAgICAgICAnNDI4Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnUHJlY29uZGl0aW9uIFJlcXVpcmVkJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgb3JpZ2luIHNlcnZlciByZXF1aXJlcyB0aGUgcmVxdWVzdCB0byBiZSBjb25kaXRpb25hbCdcbiAgICAgICAgfSxcbiAgICAgICAgJzQyOSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1RvbyBNYW55IFJlcXVlc3RzJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgdXNlciBoYXMgc2VudCB0b28gbWFueSByZXF1ZXN0cyBpbiBhIGdpdmVuIGFtb3VudCBvZiB0aW1lLiBJbnRlbmRlZCBmb3IgdXNlIHdpdGggcmF0ZSBsaW1pdGluZyBzY2hlbWVzJ1xuICAgICAgICB9LFxuICAgICAgICAnNDMxJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnUmVxdWVzdCBIZWFkZXIgRmllbGRzIFRvbyBMYXJnZScsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHNlcnZlciBpcyB1bndpbGxpbmcgdG8gcHJvY2VzcyB0aGUgcmVxdWVzdCBiZWNhdXNlIGVpdGhlciBhbiBpbmRpdmlkdWFsIGhlYWRlciBmaWVsZCwgb3IgYWxsIHRoZSBoZWFkZXIgZmllbGRzIGNvbGxlY3RpdmVseSwgYXJlIHRvbyBsYXJnZSdcbiAgICAgICAgfSxcbiAgICAgICAgJzQ1MSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1VuYXZhaWxhYmxlIEZvciBMZWdhbCBSZWFzb25zJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdBIHNlcnZlciBvcGVyYXRvciBoYXMgcmVjZWl2ZWQgYSBsZWdhbCBkZW1hbmQgdG8gZGVueSBhY2Nlc3MgdG8gYSByZXNvdXJjZSBvciB0byBhIHNldCBvZiByZXNvdXJjZXMgdGhhdCBpbmNsdWRlcyB0aGUgcmVxdWVzdGVkIHJlc291cmNlJ1xuICAgICAgICB9LFxuICAgICAgICAnNTAwJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnSW50ZXJuYWwgU2VydmVyIEVycm9yJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdBbiBlcnJvciBoYXMgb2NjdXJlZCBpbiBhIHNlcnZlciBzaWRlIHNjcmlwdCwgYSBubyBtb3JlIHNwZWNpZmljIG1lc3NhZ2UgaXMgc3VpdGFibGUnXG4gICAgICAgIH0sXG4gICAgICAgICc1MDEnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdOb3QgSW1wbGVtZW50ZWQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBzZXJ2ZXIgZWl0aGVyIGRvZXMgbm90IHJlY29nbml6ZSB0aGUgcmVxdWVzdCBtZXRob2QsIG9yIGl0IGxhY2tzIHRoZSBhYmlsaXR5IHRvIGZ1bGZpbGwgdGhlIHJlcXVlc3QnXG4gICAgICAgIH0sXG4gICAgICAgICc1MDInOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdCYWQgR2F0ZXdheScsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHNlcnZlciB3YXMgYWN0aW5nIGFzIGEgZ2F0ZXdheSBvciBwcm94eSBhbmQgcmVjZWl2ZWQgYW4gaW52YWxpZCByZXNwb25zZSBmcm9tIHRoZSB1cHN0cmVhbSBzZXJ2ZXInXG4gICAgICAgIH0sXG4gICAgICAgICc1MDMnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdTZXJ2aWNlIFVuYXZhaWxhYmxlJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc2VydmVyIGlzIGN1cnJlbnRseSB1bmF2YWlsYWJsZSAob3ZlcmxvYWRlZCBvciBkb3duKSdcbiAgICAgICAgfSxcbiAgICAgICAgJzUwNCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0dhdGV3YXkgVGltZW91dCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHNlcnZlciB3YXMgYWN0aW5nIGFzIGEgZ2F0ZXdheSBvciBwcm94eSBhbmQgZGlkIG5vdCByZWNlaXZlIGEgdGltZWx5IHJlc3BvbnNlIGZyb20gdGhlIHVwc3RyZWFtIHNlcnZlcidcbiAgICAgICAgfSxcbiAgICAgICAgJzUwNSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0hUVFAgVmVyc2lvbiBOb3QgU3VwcG9ydGVkJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc2VydmVyIGRvZXMgbm90IHN1cHBvcnQgdGhlIEhUVFAgcHJvdG9jb2wgdmVyc2lvbiB1c2VkIGluIHRoZSByZXF1ZXN0J1xuICAgICAgICB9LFxuICAgICAgICAnNTExJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnTmV0d29yayBBdXRoZW50aWNhdGlvbiBSZXF1aXJlZCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIGNsaWVudCBuZWVkcyB0byBhdXRoZW50aWNhdGUgdG8gZ2FpbiBuZXR3b3JrIGFjY2VzcydcbiAgICAgICAgfSxcbiAgICAgICAgJ2luZm8nOiB7XG4gICAgICAgICAgICAnbGFzdFVwZGF0ZSc6IHtcbiAgICAgICAgICAgICAgICAnZGF0ZSc6ICcyMDE2MDQxMScsXG4gICAgICAgICAgICAgICAgJ2xvZyc6ICc0eHggQ29kZXMgdXBkYXRlZCB2aWEgV2lraXBlZGlhJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdyZWZlcmVuY2VzJzoge1xuICAgICAgICAgICAgICAgICdXM1NjaG9vbHMnOiAnaHR0cDovL3d3dy53M3NjaG9vbHMuY29tL3RhZ3MvcmVmX2h0dHBtZXNzYWdlcy5hc3AnLFxuICAgICAgICAgICAgICAgICdXaWtpcGVkaWEnOiAnaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGlzdF9vZl9IVFRQX3N0YXR1c19jb2RlcydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnY29kZUxvb2t1cCc6IHtcbiAgICAgICAgICAgICAgICAnaW5mbyc6ICdVc2UgdGhlIFxcJ2NvZGVcXCcgdmFyaWFibGUgaW4gdGhlIHVybCB0byBsb29rdXAgYW5kIGluZGl2aWR1YWwgY29kZScsXG4gICAgICAgICAgICAgICAgJ2RlbW9VUkwnOiAnL3N0YXR1c01zZy8/Y29kZT01MDAnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2h0bWxEaXNwbGF5Jzoge1xuICAgICAgICAgICAgICAgICdpbmZvJzogJ0FkZCB0aGUgXFwnaHRtbFxcJyB2YXJpYWJsZSB0byB5b3VyIGNvZGUgbG9va3VwIHRvIGdldCB0aGUgZXJyb3IgZGlzcGxheWVkIGluIGEgbmljZSBodG1sIHRlbXBsYXRlJyxcbiAgICAgICAgICAgICAgICAnZGVtb1VSTCc6ICcvc3RhdHVzTXNnLz9jb2RlPTQwNCZodG1sJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdpbnZhbGlkQ29kZSc6ICdJZiBhbiBpbnZhbGlkIGNvZGUgaXMgZ2l2ZW4sIHRoZSBzaXRlIHdpbGwganVzdCBzaG93IHRoZSBqc29uIGxpc3Qgb2YgYWxsIGNvZGVzJyxcbiAgICAgICAgICAgICdjcmVkaXRzJzogJ1RoaXMgc2l0ZSB3YXMgY3JhZnRlZCBieSBVbnJlYWwgRGVzaWducyBhbmQgaXMgcG93ZXJlZCBieSBVRENETidcbiAgICAgICAgfSxcbiAgICAgICAgJzF4eCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0luZm9ybWF0aW9uJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICcnXG4gICAgICAgIH0sXG4gICAgICAgICcyeHgnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdTdWNjZXNzZnVsJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICcnXG4gICAgICAgIH0sXG4gICAgICAgICczeHgnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdSZWRpcmVjdGlvbicsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnJ1xuICAgICAgICB9LFxuICAgICAgICAnNHh4Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnQ2xpZW50IEVycm9yJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICcnXG4gICAgICAgIH0sXG4gICAgICAgICc1eHgnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdTZXJ2ZXIgRXJyb3InLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJydcbiAgICAgICAgfVxuICAgIH07XG5cbn1cbiJdfQ==