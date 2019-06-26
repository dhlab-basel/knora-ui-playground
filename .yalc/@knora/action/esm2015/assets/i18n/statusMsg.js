import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class StatusMsg {
    constructor() {
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
}
StatusMsg.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
StatusMsg.ngInjectableDef = i0.defineInjectable({ factory: function StatusMsg_Factory() { return new StatusMsg(); }, token: StatusMsg, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzTXNnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL2FjdGlvbi8iLCJzb3VyY2VzIjpbImFzc2V0cy9pMThuL3N0YXR1c01zZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8sU0FBUztJQUh0QjtRQUtJLFlBQU8sR0FBUTtZQUNYLEtBQUssRUFBRTtnQkFDSCxTQUFTLEVBQUUsVUFBVTtnQkFDckIsYUFBYSxFQUFFLHFHQUFxRzthQUN2SDtZQUNELEtBQUssRUFBRTtnQkFDSCxTQUFTLEVBQUUscUJBQXFCO2dCQUNoQyxhQUFhLEVBQUUsd0RBQXdEO2FBQzFFO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFNBQVMsRUFBRSxZQUFZO2dCQUN2QixhQUFhLEVBQUUsZ0ZBQWdGO2FBQ2xHO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFNBQVMsRUFBRSxJQUFJO2dCQUNmLGFBQWEsRUFBRSxnRkFBZ0Y7YUFDbEc7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLGFBQWEsRUFBRSwrREFBK0Q7YUFDakY7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsU0FBUyxFQUFFLFVBQVU7Z0JBQ3JCLGFBQWEsRUFBRSx5RkFBeUY7YUFDM0c7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsU0FBUyxFQUFFLCtCQUErQjtnQkFDMUMsYUFBYSxFQUFFLDJHQUEyRzthQUM3SDtZQUNELEtBQUssRUFBRTtnQkFDSCxTQUFTLEVBQUUsWUFBWTtnQkFDdkIsYUFBYSxFQUFFLCtFQUErRTthQUNqRztZQUNELEtBQUssRUFBRTtnQkFDSCxTQUFTLEVBQUUsZUFBZTtnQkFDMUIsYUFBYSxFQUFFLHdJQUF3STthQUMxSjtZQUNELEtBQUssRUFBRTtnQkFDSCxTQUFTLEVBQUUsaUJBQWlCO2dCQUM1QixhQUFhLEVBQUUsNkZBQTZGO2FBQy9HO1lBQ0QsS0FBSyxFQUFFO2dCQUNI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Q3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFN0YXR1c01zZyB7XG5cbiAgICBkZWZhdWx0OiBhbnkgPSB7XG4gICAgICAgICcxMDAnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdDb250aW51ZScsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHNlcnZlciBoYXMgcmVjZWl2ZWQgdGhlIHJlcXVlc3QgaGVhZGVycywgYW5kIHRoZSBjbGllbnQgc2hvdWxkIHByb2NlZWQgdG8gc2VuZCB0aGUgcmVxdWVzdCBib2R5J1xuICAgICAgICB9LFxuICAgICAgICAnMTAxJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnU3dpdGNoaW5nIFByb3RvY29scycsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHJlcXVlc3RlciBoYXMgYXNrZWQgdGhlIHNlcnZlciB0byBzd2l0Y2ggcHJvdG9jb2xzJ1xuICAgICAgICB9LFxuICAgICAgICAnMTAzJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnQ2hlY2twb2ludCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVXNlZCBpbiB0aGUgcmVzdW1hYmxlIHJlcXVlc3RzIHByb3Bvc2FsIHRvIHJlc3VtZSBhYm9ydGVkIFBVVCBvciBQT1NUIHJlcXVlc3RzJ1xuICAgICAgICB9LFxuICAgICAgICAnMjAwJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnT0snLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0IGlzIE9LICh0aGlzIGlzIHRoZSBzdGFuZGFyZCByZXNwb25zZSBmb3Igc3VjY2Vzc2Z1bCBIVFRQIHJlcXVlc3RzKSdcbiAgICAgICAgfSxcbiAgICAgICAgJzIwMSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0NyZWF0ZWQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0IGhhcyBiZWVuIGZ1bGZpbGxlZCwgYW5kIGEgbmV3IHJlc291cmNlIGlzIGNyZWF0ZWQnXG4gICAgICAgIH0sXG4gICAgICAgICcyMDInOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdBY2NlcHRlZCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHJlcXVlc3QgaGFzIGJlZW4gYWNjZXB0ZWQgZm9yIHByb2Nlc3NpbmcsIGJ1dCB0aGUgcHJvY2Vzc2luZyBoYXMgbm90IGJlZW4gY29tcGxldGVkJ1xuICAgICAgICB9LFxuICAgICAgICAnMjAzJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnTm9uLUF1dGhvcml0YXRpdmUgSW5mb3JtYXRpb24nLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0IGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBwcm9jZXNzZWQsIGJ1dCBpcyByZXR1cm5pbmcgaW5mb3JtYXRpb24gdGhhdCBtYXkgYmUgZnJvbSBhbm90aGVyIHNvdXJjZSdcbiAgICAgICAgfSxcbiAgICAgICAgJzIwNCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ05vIENvbnRlbnQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0IGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBwcm9jZXNzZWQsIGJ1dCBpcyBub3QgcmV0dXJuaW5nIGFueSBjb250ZW50J1xuICAgICAgICB9LFxuICAgICAgICAnMjA1Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnUmVzZXQgQ29udGVudCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHJlcXVlc3QgaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IHByb2Nlc3NlZCwgYnV0IGlzIG5vdCByZXR1cm5pbmcgYW55IGNvbnRlbnQsIGFuZCByZXF1aXJlcyB0aGF0IHRoZSByZXF1ZXN0ZXIgcmVzZXQgdGhlIGRvY3VtZW50IHZpZXcnXG4gICAgICAgIH0sXG4gICAgICAgICcyMDYnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdQYXJ0aWFsIENvbnRlbnQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBzZXJ2ZXIgaXMgZGVsaXZlcmluZyBvbmx5IHBhcnQgb2YgdGhlIHJlc291cmNlIGR1ZSB0byBhIHJhbmdlIGhlYWRlciBzZW50IGJ5IHRoZSBjbGllbnQnXG4gICAgICAgIH0sXG4gICAgICAgICczMDAnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdNdWx0aXBsZSBDaG9pY2VzJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdBIGxpbmsgbGlzdC4gVGhlIHVzZXIgY2FuIHNlbGVjdCBhIGxpbmsgYW5kIGdvIHRvIHRoYXQgbG9jYXRpb24uIE1heGltdW0gZml2ZSBhZGRyZXNzZXMnXG4gICAgICAgIH0sXG4gICAgICAgICczMDEnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdNb3ZlZCBQZXJtYW5lbnRseScsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHJlcXVlc3RlZCBwYWdlIGhhcyBtb3ZlZCB0byBhIG5ldyBVUkwnXG4gICAgICAgIH0sXG4gICAgICAgICczMDInOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdGb3VuZCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHJlcXVlc3RlZCBwYWdlIGhhcyBtb3ZlZCB0ZW1wb3JhcmlseSB0byBhIG5ldyBVUkwnXG4gICAgICAgIH0sXG4gICAgICAgICczMDMnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdTZWUgT3RoZXInLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0ZWQgcGFnZSBjYW4gYmUgZm91bmQgdW5kZXIgYSBkaWZmZXJlbnQgVVJMJ1xuICAgICAgICB9LFxuICAgICAgICAnMzA0Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnTm90IE1vZGlmaWVkJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdJbmRpY2F0ZXMgdGhlIHJlcXVlc3RlZCBwYWdlIGhhcyBub3QgYmVlbiBtb2RpZmllZCBzaW5jZSBsYXN0IHJlcXVlc3RlZCdcbiAgICAgICAgfSxcbiAgICAgICAgJzMwNic6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1N3aXRjaCBQcm94eScsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnLS0gTm8gbG9uZ2VyIHVzZWQgLS0nXG4gICAgICAgIH0sXG4gICAgICAgICczMDcnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdUZW1wb3JhcnkgUmVkaXJlY3QnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0ZWQgcGFnZSBoYXMgbW92ZWQgdGVtcG9yYXJpbHkgdG8gYSBuZXcgVVJMJ1xuICAgICAgICB9LFxuICAgICAgICAnMzA4Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnUmVzdW1lIEluY29tcGxldGUnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1VzZWQgaW4gdGhlIHJlc3VtYWJsZSByZXF1ZXN0cyBwcm9wb3NhbCB0byByZXN1bWUgYWJvcnRlZCBQVVQgb3IgUE9TVCByZXF1ZXN0cydcbiAgICAgICAgfSxcbiAgICAgICAgJzQwMCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0JhZCBSZXF1ZXN0JyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgcmVxdWVzdCBjYW5ub3QgYmUgZnVsZmlsbGVkIGR1ZSB0byBiYWQgc3ludGF4J1xuICAgICAgICB9LFxuICAgICAgICAnNDAxJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnVW5hdXRob3JpemVkJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgcmVxdWVzdCB3YXMgYSBsZWdhbCByZXF1ZXN0LCBidXQgdGhlIHNlcnZlciBpcyByZWZ1c2luZyB0byByZXNwb25kIHRvIGl0LiBGb3IgdXNlIHdoZW4gYXV0aGVudGljYXRpb24gaXMgcG9zc2libGUgYnV0IGhhcyBmYWlsZWQgb3Igbm90IHlldCBiZWVuIHByb3ZpZGVkJ1xuICAgICAgICB9LFxuICAgICAgICAnNDAyJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnUGF5bWVudCBSZXF1aXJlZCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnLS0gUmVzZXJ2ZWQgZm9yIGZ1dHVyZSB1c2UgLS0nXG4gICAgICAgIH0sXG4gICAgICAgICc0MDMnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdGb3JiaWRkZW4nLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0IHdhcyBhIGxlZ2FsIHJlcXVlc3QsIGJ1dCB0aGUgc2VydmVyIGlzIHJlZnVzaW5nIHRvIHJlc3BvbmQgdG8gaXQnXG4gICAgICAgIH0sXG4gICAgICAgICc0MDQnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdOb3QgRm91bmQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0ZWQgcGFnZSBjb3VsZCBub3QgYmUgZm91bmQgYnV0IG1heSBiZSBhdmFpbGFibGUgYWdhaW4gaW4gdGhlIGZ1dHVyZSdcbiAgICAgICAgfSxcbiAgICAgICAgJzQwNSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ01ldGhvZCBOb3QgQWxsb3dlZCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnQSByZXF1ZXN0IHdhcyBtYWRlIG9mIGEgcGFnZSB1c2luZyBhIHJlcXVlc3QgbWV0aG9kIG5vdCBzdXBwb3J0ZWQgYnkgdGhhdCBwYWdlJ1xuICAgICAgICB9LFxuICAgICAgICAnNDA2Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnTm90IEFjY2VwdGFibGUnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBzZXJ2ZXIgY2FuIG9ubHkgZ2VuZXJhdGUgYSByZXNwb25zZSB0aGF0IGlzIG5vdCBhY2NlcHRlZCBieSB0aGUgY2xpZW50J1xuICAgICAgICB9LFxuICAgICAgICAnNDA3Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnUHJveHkgQXV0aGVudGljYXRpb24gUmVxdWlyZWQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBjbGllbnQgbXVzdCBmaXJzdCBhdXRoZW50aWNhdGUgaXRzZWxmIHdpdGggdGhlIHByb3h5J1xuICAgICAgICB9LFxuICAgICAgICAnNDA4Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnUmVxdWVzdCBUaW1lb3V0JyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc2VydmVyIHRpbWVkIG91dCB3YWl0aW5nIGZvciB0aGUgcmVxdWVzdCdcbiAgICAgICAgfSxcbiAgICAgICAgJzQwOSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0NvbmZsaWN0JyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgcmVxdWVzdCBjb3VsZCBub3QgYmUgY29tcGxldGVkIGJlY2F1c2Ugb2YgYSBjb25mbGljdCBpbiB0aGUgcmVxdWVzdCdcbiAgICAgICAgfSxcbiAgICAgICAgJzQxMCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0dvbmUnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXF1ZXN0ZWQgcGFnZSBpcyBubyBsb25nZXIgYXZhaWxhYmxlJ1xuICAgICAgICB9LFxuICAgICAgICAnNDExJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnTGVuZ3RoIFJlcXVpcmVkJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgXCJDb250ZW50LUxlbmd0aFwiIGlzIG5vdCBkZWZpbmVkLiBUaGUgc2VydmVyIHdpbGwgbm90IGFjY2VwdCB0aGUgcmVxdWVzdCB3aXRob3V0IGl0J1xuICAgICAgICB9LFxuICAgICAgICAnNDEyJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnUHJlY29uZGl0aW9uIEZhaWxlZCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHByZWNvbmRpdGlvbiBnaXZlbiBpbiB0aGUgcmVxdWVzdCBldmFsdWF0ZWQgdG8gZmFsc2UgYnkgdGhlIHNlcnZlcidcbiAgICAgICAgfSxcbiAgICAgICAgJzQxMyc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1JlcXVlc3QgRW50aXR5IFRvbyBMYXJnZScsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHNlcnZlciB3aWxsIG5vdCBhY2NlcHQgdGhlIHJlcXVlc3QsIGJlY2F1c2UgdGhlIHJlcXVlc3QgZW50aXR5IGlzIHRvbyBsYXJnZSdcbiAgICAgICAgfSxcbiAgICAgICAgJzQxNCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1JlcXVlc3QtVVJJIFRvbyBMb25nJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc2VydmVyIHdpbGwgbm90IGFjY2VwdCB0aGUgcmVxdWVzdCwgYmVjYXVzZSB0aGUgVVJMIGlzIHRvbyBsb25nLiBPY2N1cnMgd2hlbiB5b3UgY29udmVydCBhIFBPU1QgcmVxdWVzdCB0byBhIEdFVCByZXF1ZXN0IHdpdGggYSBsb25nIHF1ZXJ5IGluZm9ybWF0aW9uJ1xuICAgICAgICB9LFxuICAgICAgICAnNDE1Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnVW5zdXBwb3J0ZWQgTWVkaWEgVHlwZScsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHNlcnZlciB3aWxsIG5vdCBhY2NlcHQgdGhlIHJlcXVlc3QsIGJlY2F1c2UgdGhlIG1lZGlhIHR5cGUgaXMgbm90IHN1cHBvcnRlZCdcbiAgICAgICAgfSxcbiAgICAgICAgJzQxNic6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1JlcXVlc3RlZCBSYW5nZSBOb3QgU2F0aXNmaWFibGUnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBjbGllbnQgaGFzIGFza2VkIGZvciBhIHBvcnRpb24gb2YgdGhlIGZpbGUsIGJ1dCB0aGUgc2VydmVyIGNhbm5vdCBzdXBwbHkgdGhhdCBwb3J0aW9uJ1xuICAgICAgICB9LFxuICAgICAgICAnNDE3Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnRXhwZWN0YXRpb24gRmFpbGVkJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc2VydmVyIGNhbm5vdCBtZWV0IHRoZSByZXF1aXJlbWVudHMgb2YgdGhlIEV4cGVjdCByZXF1ZXN0LWhlYWRlciBmaWVsZCdcbiAgICAgICAgfSxcbiAgICAgICAgJzQxOCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0lcXCdtIGEgdGVhcG90JyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdBbnkgYXR0ZW1wdCB0byBicmV3IGNvZmZlZSB3aXRoIGEgdGVhcG90IHNob3VsZCByZXN1bHQgaW4gdGhlIGVycm9yIGNvZGUgXCI0MTggSVxcJ20gYSB0ZWFwb3RcIi4gVGhlIHJlc3VsdGluZyBlbnRpdHkgYm9keSBNQVkgYmUgc2hvcnQgYW5kIHN0b3V0J1xuICAgICAgICB9LFxuICAgICAgICAnNDIxJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnTWlzZGlyZWN0ZWQgUmVxdWVzdCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHJlcXVlc3Qgd2FzIGRpcmVjdGVkIGF0IGEgc2VydmVyIHRoYXQgaXMgbm90IGFibGUgdG8gcHJvZHVjZSBhIHJlc3BvbnNlIChmb3IgZXhhbXBsZSBiZWNhdXNlIGEgY29ubmVjdGlvbiByZXVzZSknXG4gICAgICAgIH0sXG4gICAgICAgICc0MjInOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdVbnByb2Nlc3NhYmxlIEVudGl0eScsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHJlcXVlc3Qgd2FzIHdlbGwtZm9ybWVkIGJ1dCB3YXMgdW5hYmxlIHRvIGJlIGZvbGxvd2VkIGR1ZSB0byBzZW1hbnRpYyBlcnJvcnMnXG4gICAgICAgIH0sXG4gICAgICAgICc0MjMnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdMb2NrZWQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSByZXNvdXJjZSB0aGF0IGlzIGJlaW5nIGFjY2Vzc2VkIGlzIGxvY2tlZCdcbiAgICAgICAgfSxcbiAgICAgICAgJzQyNCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0ZhaWxlZCBEZXBlbmRlbmN5JyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgcmVxdWVzdCBmYWlsZWQgZHVlIHRvIGZhaWx1cmUgb2YgYSBwcmV2aW91cyByZXF1ZXN0IChlLmcuLCBhIFBST1BQQVRDSCknXG4gICAgICAgIH0sXG4gICAgICAgICc0MjYnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdVcGdyYWRlIFJlcXVpcmVkJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgY2xpZW50IHNob3VsZCBzd2l0Y2ggdG8gYSBkaWZmZXJlbnQgcHJvdG9jb2wgc3VjaCBhcyBUTFMvMS4wLCBnaXZlbiBpbiB0aGUgVXBncmFkZSBoZWFkZXIgZmllbGQnXG4gICAgICAgIH0sXG4gICAgICAgICc0MjgnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdQcmVjb25kaXRpb24gUmVxdWlyZWQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBvcmlnaW4gc2VydmVyIHJlcXVpcmVzIHRoZSByZXF1ZXN0IHRvIGJlIGNvbmRpdGlvbmFsJ1xuICAgICAgICB9LFxuICAgICAgICAnNDI5Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnVG9vIE1hbnkgUmVxdWVzdHMnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSB1c2VyIGhhcyBzZW50IHRvbyBtYW55IHJlcXVlc3RzIGluIGEgZ2l2ZW4gYW1vdW50IG9mIHRpbWUuIEludGVuZGVkIGZvciB1c2Ugd2l0aCByYXRlIGxpbWl0aW5nIHNjaGVtZXMnXG4gICAgICAgIH0sXG4gICAgICAgICc0MzEnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdSZXF1ZXN0IEhlYWRlciBGaWVsZHMgVG9vIExhcmdlJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc2VydmVyIGlzIHVud2lsbGluZyB0byBwcm9jZXNzIHRoZSByZXF1ZXN0IGJlY2F1c2UgZWl0aGVyIGFuIGluZGl2aWR1YWwgaGVhZGVyIGZpZWxkLCBvciBhbGwgdGhlIGhlYWRlciBmaWVsZHMgY29sbGVjdGl2ZWx5LCBhcmUgdG9vIGxhcmdlJ1xuICAgICAgICB9LFxuICAgICAgICAnNDUxJzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnVW5hdmFpbGFibGUgRm9yIExlZ2FsIFJlYXNvbnMnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0Egc2VydmVyIG9wZXJhdG9yIGhhcyByZWNlaXZlZCBhIGxlZ2FsIGRlbWFuZCB0byBkZW55IGFjY2VzcyB0byBhIHJlc291cmNlIG9yIHRvIGEgc2V0IG9mIHJlc291cmNlcyB0aGF0IGluY2x1ZGVzIHRoZSByZXF1ZXN0ZWQgcmVzb3VyY2UnXG4gICAgICAgIH0sXG4gICAgICAgICc1MDAnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdJbnRlcm5hbCBTZXJ2ZXIgRXJyb3InLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ0FuIGVycm9yIGhhcyBvY2N1cmVkIGluIGEgc2VydmVyIHNpZGUgc2NyaXB0LCBhIG5vIG1vcmUgc3BlY2lmaWMgbWVzc2FnZSBpcyBzdWl0YWJsZSdcbiAgICAgICAgfSxcbiAgICAgICAgJzUwMSc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ05vdCBJbXBsZW1lbnRlZCcsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnVGhlIHNlcnZlciBlaXRoZXIgZG9lcyBub3QgcmVjb2duaXplIHRoZSByZXF1ZXN0IG1ldGhvZCwgb3IgaXQgbGFja3MgdGhlIGFiaWxpdHkgdG8gZnVsZmlsbCB0aGUgcmVxdWVzdCdcbiAgICAgICAgfSxcbiAgICAgICAgJzUwMic6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ0JhZCBHYXRld2F5JyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc2VydmVyIHdhcyBhY3RpbmcgYXMgYSBnYXRld2F5IG9yIHByb3h5IGFuZCByZWNlaXZlZCBhbiBpbnZhbGlkIHJlc3BvbnNlIGZyb20gdGhlIHVwc3RyZWFtIHNlcnZlcidcbiAgICAgICAgfSxcbiAgICAgICAgJzUwMyc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1NlcnZpY2UgVW5hdmFpbGFibGUnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBzZXJ2ZXIgaXMgY3VycmVudGx5IHVuYXZhaWxhYmxlIChvdmVybG9hZGVkIG9yIGRvd24pJ1xuICAgICAgICB9LFxuICAgICAgICAnNTA0Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnR2F0ZXdheSBUaW1lb3V0JyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgc2VydmVyIHdhcyBhY3RpbmcgYXMgYSBnYXRld2F5IG9yIHByb3h5IGFuZCBkaWQgbm90IHJlY2VpdmUgYSB0aW1lbHkgcmVzcG9uc2UgZnJvbSB0aGUgdXBzdHJlYW0gc2VydmVyJ1xuICAgICAgICB9LFxuICAgICAgICAnNTA1Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnSFRUUCBWZXJzaW9uIE5vdCBTdXBwb3J0ZWQnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJ1RoZSBzZXJ2ZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgSFRUUCBwcm90b2NvbCB2ZXJzaW9uIHVzZWQgaW4gdGhlIHJlcXVlc3QnXG4gICAgICAgIH0sXG4gICAgICAgICc1MTEnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdOZXR3b3JrIEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICdUaGUgY2xpZW50IG5lZWRzIHRvIGF1dGhlbnRpY2F0ZSB0byBnYWluIG5ldHdvcmsgYWNjZXNzJ1xuICAgICAgICB9LFxuICAgICAgICAnaW5mbyc6IHtcbiAgICAgICAgICAgICdsYXN0VXBkYXRlJzoge1xuICAgICAgICAgICAgICAgICdkYXRlJzogJzIwMTYwNDExJyxcbiAgICAgICAgICAgICAgICAnbG9nJzogJzR4eCBDb2RlcyB1cGRhdGVkIHZpYSBXaWtpcGVkaWEnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ3JlZmVyZW5jZXMnOiB7XG4gICAgICAgICAgICAgICAgJ1czU2Nob29scyc6ICdodHRwOi8vd3d3Lnczc2Nob29scy5jb20vdGFncy9yZWZfaHR0cG1lc3NhZ2VzLmFzcCcsXG4gICAgICAgICAgICAgICAgJ1dpa2lwZWRpYSc6ICdodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MaXN0X29mX0hUVFBfc3RhdHVzX2NvZGVzJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdjb2RlTG9va3VwJzoge1xuICAgICAgICAgICAgICAgICdpbmZvJzogJ1VzZSB0aGUgXFwnY29kZVxcJyB2YXJpYWJsZSBpbiB0aGUgdXJsIHRvIGxvb2t1cCBhbmQgaW5kaXZpZHVhbCBjb2RlJyxcbiAgICAgICAgICAgICAgICAnZGVtb1VSTCc6ICcvc3RhdHVzTXNnLz9jb2RlPTUwMCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnaHRtbERpc3BsYXknOiB7XG4gICAgICAgICAgICAgICAgJ2luZm8nOiAnQWRkIHRoZSBcXCdodG1sXFwnIHZhcmlhYmxlIHRvIHlvdXIgY29kZSBsb29rdXAgdG8gZ2V0IHRoZSBlcnJvciBkaXNwbGF5ZWQgaW4gYSBuaWNlIGh0bWwgdGVtcGxhdGUnLFxuICAgICAgICAgICAgICAgICdkZW1vVVJMJzogJy9zdGF0dXNNc2cvP2NvZGU9NDA0Jmh0bWwnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgJ2ludmFsaWRDb2RlJzogJ0lmIGFuIGludmFsaWQgY29kZSBpcyBnaXZlbiwgdGhlIHNpdGUgd2lsbCBqdXN0IHNob3cgdGhlIGpzb24gbGlzdCBvZiBhbGwgY29kZXMnLFxuICAgICAgICAgICAgJ2NyZWRpdHMnOiAnVGhpcyBzaXRlIHdhcyBjcmFmdGVkIGJ5IFVucmVhbCBEZXNpZ25zIGFuZCBpcyBwb3dlcmVkIGJ5IFVEQ0ROJ1xuICAgICAgICB9LFxuICAgICAgICAnMXh4Jzoge1xuICAgICAgICAgICAgJ21lc3NhZ2UnOiAnSW5mb3JtYXRpb24nLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJydcbiAgICAgICAgfSxcbiAgICAgICAgJzJ4eCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1N1Y2Nlc3NmdWwnLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJydcbiAgICAgICAgfSxcbiAgICAgICAgJzN4eCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1JlZGlyZWN0aW9uJyxcbiAgICAgICAgICAgICdkZXNjcmlwdGlvbic6ICcnXG4gICAgICAgIH0sXG4gICAgICAgICc0eHgnOiB7XG4gICAgICAgICAgICAnbWVzc2FnZSc6ICdDbGllbnQgRXJyb3InLFxuICAgICAgICAgICAgJ2Rlc2NyaXB0aW9uJzogJydcbiAgICAgICAgfSxcbiAgICAgICAgJzV4eCc6IHtcbiAgICAgICAgICAgICdtZXNzYWdlJzogJ1NlcnZlciBFcnJvcicsXG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOiAnJ1xuICAgICAgICB9XG4gICAgfTtcblxufVxuIl19